import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TradingState, TimeRange, CurrencyPair, ChartDataPoint, OrderBookEntry, TradeEntry, OpenOrder, TradingMetrics, PriceData } from '../types/trading';

// Utility functions for generating mock data
const generateRandomPrice = (basePrice: number, volatility: number = 0.02): number => {
  const changePercent = (Math.random() - 0.5) * volatility * 2; // +/- volatility
  const newPrice = basePrice * (1 + changePercent);
  // Format to XXX.XX format (3 digits before decimal, 2 after)
  return parseFloat((newPrice % 1000).toFixed(2));
};

const generateChartData = (timeRange: TimeRange, basePrice: number): ChartDataPoint[] => {
  const now = Date.now();
  let dataPoints: number;
  let interval: number;

  switch (timeRange) {
    case '7D':
      dataPoints = 18; // 7 days / 18 points ≈ 9.33 hours
      interval = 9.33 * 60 * 60 * 1000;
      break;

    case '1M':
      dataPoints = 30; // 30 days / 30 points = 1 point/day
      interval = 24 * 60 * 60 * 1000;
      break;

    case '3M':
      dataPoints = 36; // 90 days / 36 points = 1 point every 2.5 days
      interval = 2.5 * 24 * 60 * 60 * 1000;
      break;

    case '1Y':
      dataPoints = 52; // 52 weeks / 52 points = 1 point every week
      interval = 7 * 24 * 60 * 60 * 1000;
      break;

    case '5Y':
      dataPoints = 60; // 5 years = 60 months → 1 point/month
      interval = 30 * 24 * 60 * 60 * 1000; // 30 days
      break;

    case 'Max':
      dataPoints = 120; // 10 years = 120 months → 1 point/month
      interval = 30 * 24 * 60 * 60 * 1000;
      break;

    default:
      dataPoints = 18;
      interval = 9.33 * 60 * 60 * 1000;
  }

  const data: ChartDataPoint[] = [];
  let currentPrice = basePrice;

  for (let i = dataPoints - 1; i >= 0; i--) {
    const timestamp = now - (dataPoints - i) * interval;
    const open = currentPrice;
    const high = generateRandomPrice(open, 0.02);
    const low = generateRandomPrice(open, 0.02);
    const close = generateRandomPrice(low + Math.random() * (high - low), 0.01);
    const volume = Math.random() * 500 + 100;

    data.push({
      timestamp,
      open,
      high: Math.max(open, high, low, close),
      low: Math.min(open, high, low, close),
      close,
      volume,
    });

    currentPrice = close;
  }

  return data;
};

const generateOrderBook = (basePrice: number): OrderBookEntry[] => {
  const orderBook: OrderBookEntry[] = [];
  
  // Generate buy orders (below current price)
  for (let i = 0; i < 6; i++) {
    const price = generateRandomPrice(basePrice * (1 - (i + 1) * 0.001), 0.001);
    const amount = Math.random() * 10 + 0.001;
    orderBook.push({ price, amount, type: 'buy' });
  }

  // Generate sell orders (above current price)
  for (let i = 0; i < 6; i++) {
    const price = generateRandomPrice(basePrice * (1 + (i + 1) * 0.001), 0.001);
    const amount = Math.random() * 10 + 0.001;
    orderBook.push({ price, amount, type: 'sell' });
  }

  return orderBook.sort((a, b) => b.price - a.price);
};

const generateTrades = (basePrice: number): TradeEntry[] => {
  const trades: TradeEntry[] = [];
  const now = Date.now();

  for (let i = 0; i < 9; i++) {
    const price = generateRandomPrice(basePrice, 0.005);
    const amount = Math.random() * 5 + 0.001;
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    const timestamp = now - i * 30000; // 30 seconds apart

    trades.push({ price, amount, type, timestamp });
  }

  return trades.sort((a, b) => b.timestamp - a.timestamp);
};

const generateOpenOrders = (): OpenOrder[] => {
  return [
    {
      id: '1',
      type: 'buy',
      pair: 'BTC/ETH',
      price: 0.0001230,
      amount: 0.0001230,
      executed: 0,
      placedAt: Date.now() - 2 * 60 * 1000, // 2 minutes ago
    },
  ];
};

const generateMetrics = (basePrice: number): TradingMetrics => {
  return {
    high: generateRandomPrice(basePrice * 1.02, 0.01),
    low: generateRandomPrice(basePrice * 0.75, 0.01),
    volumeBTC: generateRandomPrice(basePrice * 0.8, 0.01),
    volumeETH: generateRandomPrice(basePrice * 0.6, 0.01),
  };
};

const generatePriceData = (basePrice: number): PriceData => {
  const currentPrice = generateRandomPrice(basePrice, 0.01);
  const change = currentPrice - basePrice;
  const changePercent = (change / basePrice) * 100;
  
  return {
    price: currentPrice,
    change,
    changePercent,
  };
};

// Async thunk for updating real-time data
export const updateRealTimeData = createAsyncThunk(
  'trading/updateRealTimeData',
  async (_, { getState }) => {
    const state = getState() as { trading: TradingState };
    const { selectedCurrencyPair } = state.trading;
    
    // Base prices for different currency pairs
    const basePrices = {
      'USD/BTC': 360.55,
      'USD/ETH': 200.00,
      'BTC/ETH': 0.048,
    };
    
    const basePrice = basePrices[selectedCurrencyPair];
    const currentPrice = generateRandomPrice(basePrice, 0.01);
    
    return {
      metrics: generateMetrics(currentPrice),
      priceData: generatePriceData(currentPrice),
      chartData: generateChartData(state.trading.selectedTimeRange, currentPrice),
      orderBook: generateOrderBook(currentPrice),
      trades: generateTrades(currentPrice),
    };
  }
);

const initialState: TradingState = {
  metrics: {
    high: 352.01,
    low: 302.42,
    volumeBTC: 352.01,
    volumeETH: 302.42,
  },
  priceData: {
    price: 360.55,
    change: 25.55,
    changePercent: 1.25,
  },
  chartData: generateChartData('7D', 360.55),
  orderBook: generateOrderBook(360.55),
  trades: generateTrades(360.55),
  openOrders: generateOpenOrders(),
  selectedTimeRange: '7D',
  selectedCurrencyPair: 'USD/BTC',
  isLoading: false,
};

const tradingSlice = createSlice({
  name: 'trading',
  initialState,
  reducers: {
    setTimeRange: (state, action: PayloadAction<TimeRange>) => {
      state.selectedTimeRange = action.payload;
      state.chartData = generateChartData(action.payload, state.priceData.price);
    },
    setCurrencyPair: (state, action: PayloadAction<CurrencyPair>) => {
      state.selectedCurrencyPair = action.payload;
      const basePrices = {
        'USD/BTC': 360.55,
        'USD/ETH': 200.00,
        'BTC/ETH': 0.048,
      };
      const basePrice = basePrices[action.payload];
      state.priceData = generatePriceData(basePrice);
      state.metrics = generateMetrics(basePrice);
      state.chartData = generateChartData(state.selectedTimeRange, basePrice);
      state.orderBook = generateOrderBook(basePrice);
      state.trades = generateTrades(basePrice);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateRealTimeData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRealTimeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.metrics = action.payload.metrics;
        state.priceData = action.payload.priceData;
        state.chartData = action.payload.chartData;
        state.orderBook = action.payload.orderBook;
        state.trades = action.payload.trades;
      })
      .addCase(updateRealTimeData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setTimeRange, setCurrencyPair } = tradingSlice.actions;
export default tradingSlice.reducer; 
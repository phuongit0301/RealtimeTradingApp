export interface TradingMetrics {
  high: number;
  low: number;
  volumeBTC: number;
  volumeETH: number;
}

export interface PriceData {
  price: number;
  change: number;
  changePercent: number;
}

export interface ChartDataPoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  type: 'buy' | 'sell';
}

export interface TradeEntry {
  price: number;
  amount: number;
  type: 'buy' | 'sell';
  timestamp: number;
}

export interface OpenOrder {
  id: string;
  type: 'buy' | 'sell';
  pair: string;
  price: number;
  amount: number;
  executed: number;
  placedAt: number;
}

export type TimeRange = '7D' | '1M' | '3M' | '1Y' | '5Y' | 'Max';
export type CurrencyPair = 'USD/BTC' | 'USD/ETH' | 'BTC/ETH';

export interface TradingState {
  metrics: TradingMetrics;
  priceData: PriceData;
  chartData: ChartDataPoint[];
  orderBook: OrderBookEntry[];
  trades: TradeEntry[];
  openOrders: OpenOrder[];
  selectedTimeRange: TimeRange;
  selectedCurrencyPair: CurrencyPair;
  isLoading: boolean;
} 
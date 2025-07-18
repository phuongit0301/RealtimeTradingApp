# Realtime Trading App

A React Native trading application with real-time data visualization, built with Redux Toolkit and modern UI components.

## Features

### ✅ Implemented Features

1. **Real-time Data Updates**
   - Chart, Trades, and Order Book update every 5 seconds
   - Smooth animations and transitions
   - Performance optimized for 55-60 FPS

2. **Interactive Chart**
   - Custom SVG-based chart implementation
   - Multiple time ranges: 7D, 1M, 3M, 1Y, 5Y, Max
   - Volume bars and price line visualization
   - Responsive design

3. **Currency Pair Selection**
   - Support for USD/BTC, USD/ETH, BTC/ETH
   - Modal-based currency selector
   - Real-time data generation for each pair

4. **Order Book & Trades**
   - Real-time order book with buy/sell orders
   - Recent trades with timestamps
   - Color-coded (green for buy, red for sell)

5. **Open Orders Management**
   - Tabbed interface (Open, Filled, Cancelled)
   - Order details with execution status
   - Time-based order tracking

6. **State Management**
   - Redux Toolkit for efficient state management
   - Async thunks for real-time data updates
   - Optimized re-renders

### 🎨 UI/UX Features

- **Dark Theme**: Professional trading interface
- **Responsive Design**: Works on different screen sizes
- **Smooth Animations**: 60 FPS performance
- **Modern UI**: Clean, professional appearance
- **Real-time Updates**: Live data simulation

## Technical Stack

- **React Native**: 0.80.1
- **Redux Toolkit**: State management
- **React Native SVG**: Chart rendering
- **React Native Vector Icons**: UI icons
- **TypeScript**: Type safety

## Installation

### Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RealtimeTradingApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Run the application**

   **iOS:**
   ```bash
   npx react-native run-ios
   ```

   **Android:**
   ```bash
   npx react-native run-android
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # App header with time and navigation
│   ├── MetricsCard.tsx # High/Low/Volume metrics
│   ├── PriceDisplay.tsx # Current price and currency selector
│   ├── TradingChart.tsx # Interactive chart component
│   ├── OrderBook.tsx   # Order book display
│   ├── Trades.tsx      # Recent trades list
│   ├── OpenOrders.tsx  # Open orders management
│   └── CurrencySelector.tsx # Currency pair selector
├── screens/            # Screen components
│   └── TradingScreen.tsx # Main trading interface
├── store/              # Redux store configuration
│   ├── index.ts        # Store setup
│   └── tradingSlice.ts # Trading state management
├── types/              # TypeScript type definitions
│   └── trading.ts      # Trading data types
└── hooks/              # Custom React hooks
    └── usePerformanceOptimization.ts # Performance optimization
```

## Performance Optimizations

1. **Frame Rate Management**: Maintains 55-60 FPS
2. **Optimized Re-renders**: Redux Toolkit for efficient updates
3. **SVG-based Charts**: Lightweight chart rendering
4. **Debounced Updates**: Prevents excessive re-renders
5. **Memory Management**: Proper cleanup of intervals and listeners

## Data Generation

The app uses sophisticated mock data generation:

- **Price Simulation**: Realistic price movements with volatility
- **Time-based Data**: Different data points for various time ranges
- **Volume Simulation**: Realistic trading volumes
- **Order Book**: Dynamic buy/sell order generation
- **Trade History**: Timestamped trade records

## Customization

### Adding New Currency Pairs

1. Update the `CurrencyPair` type in `src/types/trading.ts`
2. Add base prices in `src/store/tradingSlice.ts`
3. Update the currency selector component

### Modifying Chart Styles

Edit the `TradingChart.tsx` component to customize:
- Chart colors and themes
- Grid line styles
- Animation durations
- Chart dimensions

### Adjusting Update Frequency

Modify the interval in `src/screens/TradingScreen.tsx`:
```typescript
const interval = setInterval(() => {
  dispatch(updateRealTimeData());
}, 5000); // Change this value (in milliseconds)
```

## Troubleshooting

### Chart Not Displaying

If the chart doesn't display:

1. **iOS**: Run `cd ios && pod install`
2. **Android**: Clean and rebuild the project
3. **Check SVG support**: Ensure `react-native-svg` is properly linked

### Performance Issues

1. **Reduce update frequency**: Increase the interval in TradingScreen
2. **Limit data points**: Reduce the number of chart data points
3. **Check device performance**: Some older devices may struggle with real-time updates

### Build Issues

1. **Clean build**: `npx react-native clean`
2. **Reset cache**: `npx react-native start --reset-cache`
3. **Reinstall dependencies**: Delete `node_modules` and run `npm install`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';
import { ChartDataPoint, TimeRange } from '../types/trading';

interface TradingChartProps {
  chartData: ChartDataPoint[];
  selectedTimeRange: TimeRange;
  onTimeRangeChange: (timeRange: TimeRange) => void;
}
const screenWidth = Dimensions.get('window').width;

const TradingChart: React.FC<TradingChartProps> = ({
  chartData,
  selectedTimeRange,
  onTimeRangeChange,
}) => {
  const chartWidth = screenWidth - 178;

  // Convert data to Wagmi format
  const candles = chartData.map(point => ({
    timestamp: new Date(point.timestamp).getTime(),
    open: point.open,
    high: point.high,
    low: point.low,
    close: point.close,
  }));

  // 👉 Tính min/max để chia lưới
  const allPrices = chartData.flatMap(d => [d.high, d.low]);
  const maxPrice = Math.max(...allPrices);
  const minPrice = Math.min(...allPrices);
  const step = (maxPrice - minPrice) / 4;

  const gridPrices = Array.from({ length: 5 }, (_, i) =>
    (maxPrice - i * step).toFixed(2)
  );

  const timeRanges: TimeRange[] = ['7D', '1M', '3M', '1Y', '5Y', 'Max'];

  return (
    <View style={styles.container}>
      <View style={styles.chartWithGrid}>
        <CandlestickChart.Provider data={candles}>
          <View style={styles.chartContainer}>
            <CandlestickChart height={300} width={chartWidth}>
              <CandlestickChart.Candles 
                positiveColor="#4ade80"
                negativeColor="#f87171"
              />
              <CandlestickChart.Crosshair>
                <CandlestickChart.PriceText style={styles.priceText} />
                <CandlestickChart.DatetimeText style={styles.dateText} />
              </CandlestickChart.Crosshair>
            </CandlestickChart>

            {/* 👉 Horizontal Grid Lines */}
            <View style={styles.gridOverlay}>
              {[...Array(10)].map((_, index) => (
                <View key={index} style={styles.gridLine} />
              ))}
            </View>

            {/* 👉 Vertical Grid Lines */}
            <View style={styles.verticalGridOverlay}>
              {[...Array(8)].map((_, index) => (
                <View key={index} style={styles.verticalLine} />
              ))}
            </View>

            {/* 👉 Add price labels */}
            <View style={styles.priceLabelsContainer}>
              {[...Array(10)].map((_, index) => {
                const price = maxPrice - index * step;
                return (
                  <Text key={index} style={styles.priceLabel}>
                    ${price.toFixed(2)}
                  </Text>
                );
              })}
            </View>
            
            {/* Volume Chart */}
            <View style={styles.volumeContainer}>
              <CandlestickChart height={80} width={chartWidth}>
                <CandlestickChart.Candles 
                  positiveColor="rgba(74, 222, 128, 0.3)"     // xanh mờ
                  negativeColor="rgba(248, 113, 113, 0.3)"     // đỏ mờ
                />
              </CandlestickChart>
            </View>
          </View>
          
        </CandlestickChart.Provider>
      </View>
      <View style={styles.timeRangeContainer}>
        {timeRanges.map((range) => (
          <TouchableOpacity
            key={range}
            style={[
              styles.timeRangeButton,
              selectedTimeRange === range && styles.timeRangeButtonActive,
            ]}
            onPress={() => onTimeRangeChange(range)}
          >
            <Text
              style={[
                styles.timeRangeText,
                selectedTimeRange === range && styles.timeRangeTextActive,
              ]}
            >
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.chartControls}>
        <TouchableOpacity style={[styles.controlButton, styles.controlButtonActive]}>
          <Text style={styles.controlButtonTextActive}>H1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlButtonText}>↻</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlButtonText}>🎯</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartWithGrid: {
    position: 'relative',
  },
  container: {
    backgroundColor: '#16213e',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    marginVertical: 8,
    paddingVertical: 16,
    width: screenWidth - 120,
    overflow: 'hidden',
  },
  priceInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  priceMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currentPrice: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  priceChange: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pricePositive: {
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
  },
  priceNegative: {
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
  },
  priceChangeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ade80',
  },
  priceDetails: {
    alignItems: 'flex-end',
  },
  priceDetailText: {
    color: '#8b9dc3',
    fontSize: 12,
    fontWeight: '500',
  },
  chartContainer: {
    height: 380,
    width: '100%',
    marginBottom: 8,
    position: 'relative',
  },
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  gridLine: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: '90%'
  },
  priceLabelsContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingRight: 4,
    zIndex: 2,
  },
  priceLabel: {
    color: '#ccc',
    fontSize: 10,
    textAlign: 'right',
  },
  volumeContainer: {
    height: 80,
    width: '100%',
    marginBottom: 16,
  },
  priceText: {
    color: '#8b9dc3',
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    color: '#8b9dc3',
    fontSize: 10,
    marginTop: 4,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeRangeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'transparent',
  },
  timeRangeButtonActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    borderColor: '#3b82f6',
  },
  timeRangeText: {
    color: '#8b9dc3',
    fontSize: 12,
    fontWeight: '500',
  },
  timeRangeTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  chartControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  controlButton: {
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  controlButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  controlButtonTextActive: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 32, // tránh chồng lên label giá
    justifyContent: 'space-between',
    zIndex: 1,
  },
  gridRow: {
    height: 1,
    width: '100%',
  },
  verticalGridOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 64, // tránh đè lên price label bên phải
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default TradingChart;

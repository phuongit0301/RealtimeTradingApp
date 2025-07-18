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
  const chartWidth = screenWidth - 32;

  // Convert data to Wagmi format
  const candles = chartData.map(point => ({
    timestamp: new Date(point.timestamp).getTime(),
    open: point.open,
    high: point.high,
    low: point.low,
    close: point.close,
  }));

  // Get current candle for price calculations
  const currentCandle = chartData[chartData.length - 1];

  const timeRanges: TimeRange[] = ['7D', '1M', '3M', '1Y', '5Y', 'Max'];

  return (
    <View style={styles.container}>
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
          
          {/* Custom Grid Lines */}
          <View style={styles.gridContainer}>
            {[...Array(6)].map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.gridLine,
                  { top: (index * 300) / 5 }
                ]} 
              />
            ))}
          </View>
          
          {/* Price Labels on Right Side */}
          <View style={styles.priceLabelsContainer}>
            {[...Array(6)].map((_, index) => {
              const price = currentCandle.high - (index * (currentCandle.high - currentCandle.low) / 5);
              return (
                <Text key={index} style={styles.priceLabel}>
                  ${price.toFixed(2)}
                </Text>
              );
            })}
          </View>
        </View>
        
        {/* Volume Chart */}
        <View style={styles.volumeContainer}>
          <CandlestickChart height={80} width={chartWidth}>
            <CandlestickChart.Candles 
              positiveColor="#4ade80"
              negativeColor="#f87171"
            />
          </CandlestickChart>
        </View>
      </CandlestickChart.Provider>

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
    height: 300,
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
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#FFFFFF',
  },
  priceLabelsContainer: {
    position: 'absolute',
    top: 0,
    right: 8,
    bottom: 0,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  priceLabel: {
    color: '#8b9dc3',
    fontSize: 10,
    fontWeight: '500',
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
});

export default TradingChart;

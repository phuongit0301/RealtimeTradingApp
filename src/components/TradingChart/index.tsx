import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';

import { ChartDataPoint, TimeRange } from '@/types/trading';
import styles from './styles';

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

  const allPrices = chartData.flatMap(d => [d.high, d.low]);
  const maxPrice = Math.max(...allPrices);
  const minPrice = Math.min(...allPrices);
  const step = (maxPrice - minPrice) / 4;

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

            {/*  Horizontal Grid Lines */}
            <View style={styles.gridOverlay}>
              {[...Array(10)].map((_, index) => (
                <View key={index} style={styles.gridLine} />
              ))}
            </View>

            {/* Vertical Grid Lines */}
            <View style={styles.verticalGridOverlay}>
              {[...Array(8)].map((_, index) => (
                <View key={index} style={styles.verticalLine} />
              ))}
            </View>

            {/* Add price labels */}
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

export default TradingChart;

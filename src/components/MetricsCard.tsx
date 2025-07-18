import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChartDataPoint } from '../types/trading';

interface MetricsCardProps {
  chartData: ChartDataPoint[];
}

const MetricsCard: React.FC<MetricsCardProps> = ({ chartData }) => {
  const currentCandle = chartData[chartData.length - 1];

  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatVolume = (volume: number): string => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(2)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(2)}K`;
    }
    return volume.toFixed(2);
  };

  // Calculate total volume for the selected time range
  const totalVolume = chartData.reduce((sum, candle) => sum + candle.volume, 0);
  
  // For demo purposes, we'll use the same volume for both BTC and ETH
  // In a real app, you'd have separate volume data for each currency
  const volumeBTC = totalVolume;
  const volumeETH = totalVolume * 0.8; // Simulate different volume for ETH

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.metric}>
          <Text style={styles.valueGreen}>High</Text>
          <Text style={styles.label}>{formatPrice(currentCandle.high)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.valueRed}>Low</Text>
          <Text style={styles.label}>{formatPrice(currentCandle.low)}</Text>
        </View>
      </View>
      <View style={styles.borderLine}>
        <View style={styles.metric}>
          <Text style={styles.label2}>Vol (BTC)</Text>
          <Text style={styles.value}>{formatVolume(volumeBTC)}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.metric}>
          <Text style={styles.label2}>Vol (BTC)</Text>
          <Text style={styles.value}>{formatVolume(volumeBTC)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.label2}>Vol (ETH)</Text>
          <Text style={styles.value}>{formatVolume(volumeETH)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  label2: {
    color: '#CCCCCC',
    fontSize: 12,
    fontWeight: '500',
  },
  value: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  valueGreen: {
    color: '#4ade80',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  valueRed: {
    color: '#f87171',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  borderLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginVertical: 12,
  }
});

export default MetricsCard; 
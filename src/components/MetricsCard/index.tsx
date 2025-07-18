import React from 'react';
import { View, Text } from 'react-native';

import { formatNumber, formatVolume } from '@/utils';
import styles from './styles';
import { ChartDataPoint } from '@/types/trading';

interface MetricsCardProps {
  chartData: ChartDataPoint[];
}

const MetricsCard: React.FC<MetricsCardProps> = ({ chartData }) => {
  const currentCandle = chartData[chartData.length - 1];
  const totalVolume = chartData.reduce((sum, candle) => sum + candle.volume, 0);
  const volumeBTC = totalVolume;
  const volumeETH = totalVolume * 0.8;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.metric}>
          <Text style={styles.valueGreen}>High</Text>
          <Text style={styles.label}>{formatNumber(currentCandle.high)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.valueRed}>Low</Text>
          <Text style={styles.label}>{formatNumber(currentCandle.low)}</Text>
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

export default MetricsCard; 
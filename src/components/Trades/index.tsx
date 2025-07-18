import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { TradeEntry } from '@/types/trading';
import { formatNumber } from '@/utils';
import styles from './styles';

interface TradesProps {
  trades: TradeEntry[];
}

const Trades: React.FC<TradesProps> = ({ trades }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trades</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {trades.slice(0, 9).map((trade, index) => (
          <View key={index} style={styles.tradeRow}>
            <Text style={trade.type === 'buy' ? styles.priceGreen : styles.priceRed}>
              {formatNumber(trade.price)}
            </Text>
            <Text style={styles.amount}>{formatNumber(trade.amount)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Trades; 
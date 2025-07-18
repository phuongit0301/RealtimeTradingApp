import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TradeEntry } from '../types/trading';

interface TradesProps {
  trades: TradeEntry[];
}

const Trades: React.FC<TradesProps> = ({ trades }) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  tradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceGreen: {
    color: '#4ade80',
    fontSize: 12,
    fontWeight: '500',
  },
  priceRed: {
    color: '#f87171',
    fontSize: 12,
    fontWeight: '500',
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  time: {
    color: '#8b9dc3',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'right',
  },
});

export default Trades; 
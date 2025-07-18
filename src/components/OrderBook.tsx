import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { OrderBookEntry } from '../types/trading';

interface OrderBookProps {
  orderBook: OrderBookEntry[];
}

const OrderBook: React.FC<OrderBookProps> = ({ orderBook }) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const buyOrders = orderBook.filter(order => order.type === 'buy').slice(0, 6);
  const sellOrders = orderBook.filter(order => order.type === 'sell').slice(0, 6);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order book</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Sell orders (red) */}
        {sellOrders.map((order, index) => (
          <View key={`sell-${index}`} style={styles.orderRow}>
            <Text style={styles.priceRed}>{formatNumber(order.price)}</Text>
            <Text style={styles.amount}>{formatNumber(order.amount)}</Text>
          </View>
        ))}
        
        {/* Buy orders (green) */}
        {buyOrders.map((order, index) => (
          <View key={`buy-${index}`} style={styles.orderRow}>
            <Text style={styles.priceGreen}>{formatNumber(order.price)}</Text>
            <Text style={styles.amount}>{formatNumber(order.amount)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  orderRow: {
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
  },
});

export default OrderBook; 
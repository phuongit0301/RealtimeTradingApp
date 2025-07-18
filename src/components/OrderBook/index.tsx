import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { formatNumber } from '@/utils';
import { OrderBookEntry } from '@/types/trading';
import styles from './styles';

interface OrderBookProps {
  orderBook: OrderBookEntry[];
}

const OrderBook: React.FC<OrderBookProps> = ({ orderBook }) => {
  
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

export default OrderBook; 
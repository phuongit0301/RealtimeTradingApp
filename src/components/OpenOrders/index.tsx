import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Circle } from 'lucide-react-native';

import { OpenOrder } from '@/types/trading';
import styles from './styles';

interface OpenOrdersProps {
  openOrders: OpenOrder[];
}

type TabType = 'Open' | 'Filled' | 'Cancelled';

const OpenOrders: React.FC<OpenOrdersProps> = ({ openOrders }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Open');

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    });
  };

  const formatTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    return `Placed ${minutes}mins ago`;
  };

  const tabs: TabType[] = ['Open', 'Filled', 'Cancelled'];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.ordersContainer} showsVerticalScrollIndicator={false}>
        {activeTab === 'Open' && openOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderDetails}>
              <View style={styles.detailColumn}>
                <View style={styles.orderType}>
                  <Circle size={16} color="#FFFFFF" />
                  <Text style={[styles.orderTypeText, order.type === 'buy' ? styles.buyText : styles.sellText]}>
                    {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                  </Text>
                </View>
                <Text style={[styles.detailLabel, {marginLeft: 20}]}>Price</Text>
                <Text style={[styles.detailValue, {marginLeft: 20}]}>{formatNumber(order.price)}BTC</Text>
              </View>
              <View style={styles.detailColumn}>
                <Text style={styles.pairText}>{order.pair}</Text>
                <Text style={styles.detailLabel}>Amount</Text>
                <Text style={styles.detailValue}>{formatNumber(order.amount)}ETH</Text>
              </View>
              <View style={styles.detailColumn}>
                <Text style={styles.orderTime}>{formatTime(order.placedAt)}</Text>
                <Text style={styles.detailLabel}>Executed</Text>
                <Text style={styles.detailValue}>{formatNumber(order.executed)}ETH</Text>
              </View>
            </View>
          </View>
        ))}

        {activeTab === 'Filled' && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No filled orders</Text>
          </View>
        )}

        {activeTab === 'Cancelled' && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No cancelled orders</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OpenOrders; 
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { OpenOrder } from '../types/trading';
import { Circle, Menu } from 'lucide-react-native';

interface OpenOrdersProps {
  openOrders: OpenOrder[];
}

type TabType = 'Open' | 'Filled' | 'Cancelled';

const { width } = Dimensions.get('window');

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

const styles = StyleSheet.create({
  container: {
    width: width - 120,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  tabText: {
    color: '#8b9dc3',
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 8,
    height: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
  },
  ordersContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  orderCard: {
    backgroundColor: '#16213e',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderTypeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  buyText: {
    color: '#4ade80',
  },
  sellText: {
    color: '#f87171',
  },
  orderTime: {
    color: '#8b9dc3',
    fontSize: 10,
    marginBottom: 4,
  },
  orderDetails: {
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    color: '#8b9dc3',
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
  },
  pairInfo: {
    alignItems: 'flex-end',
  },
  pairText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#8b9dc3',
    fontSize: 14,
  },
});

export default OpenOrders; 
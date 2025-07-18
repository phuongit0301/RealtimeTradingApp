import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { updateRealTimeData, setTimeRange, setCurrencyPair } from '../store/tradingSlice';

import Header from '../components/Header';
import MetricsCard from '../components/MetricsCard';
import PriceDisplay from '../components/PriceDisplay';
import TradingChart from '../components/TradingChart';
import OrderBook from '../components/OrderBook';
import Trades from '../components/Trades';
import OpenOrders from '../components/OpenOrders';
import CurrencySelector from '../components/CurrencySelector';
import styles from './styles';

const TradingScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    priceData,
    chartData,
    orderBook,
    trades,
    openOrders,
    selectedTimeRange,
    selectedCurrencyPair,
  } = useSelector((state: RootState) => state.trading);

  const [currencySelectorVisible, setCurrencySelectorVisible] = useState(false);

  // Real-time data update every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateRealTimeData());
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleTimeRangeChange = (timeRange: any) => {
    dispatch(setTimeRange(timeRange));
  };

  const handleCurrencySelect = () => {
    setCurrencySelectorVisible(true);
  };

  const handleCurrencyChange = (currency: any) => {
    dispatch(setCurrencyPair(currency));
  };

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Menu functionality would go here');
  };

  const handleSharePress = () => {
    Alert.alert('Share', 'Share functionality would go here');
  };

  return (
    <View style={styles.container}>
      <Header onMenuPress={handleMenuPress} onSharePress={handleSharePress} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Top section with metrics and price */}
        <View style={styles.topSection}>
          <MetricsCard chartData={chartData} />
          <PriceDisplay
            priceData={priceData}
            selectedCurrencyPair={selectedCurrencyPair}
            onCurrencySelect={handleCurrencySelect}
          />
        </View>

        {/* Chart section */}
        <View style={styles.chartContainer}>
          <View style={[styles.columns]}>
            <TradingChart
              chartData={chartData}
              selectedTimeRange={selectedTimeRange}
              onTimeRangeChange={handleTimeRangeChange}
            />
            {/* Open orders section */}
            <OpenOrders openOrders={openOrders} />
          </View>

          <View style={styles.chartInfoContainer}>
            {/* Order book and trades section */}
            <OrderBook orderBook={orderBook} />
            <Trades trades={trades} />
          </View>

        </View>

      </ScrollView>

      {/* Currency selector modal */}
      <CurrencySelector
        visible={currencySelectorVisible}
        selectedCurrency={selectedCurrencyPair}
        onSelect={handleCurrencyChange}
        onClose={() => setCurrencySelectorVisible(false)}
      />
    </View>
  );
};

export default TradingScreen; 
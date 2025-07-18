import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { PriceData, CurrencyPair } from '../types/trading';

interface PriceDisplayProps {
  priceData: PriceData;
  selectedCurrencyPair: CurrencyPair;
  onCurrencySelect: () => void;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  priceData,
  selectedCurrencyPair,
  onCurrencySelect,
}) => {
  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatChange = (change: number): string => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatChangePercent = (percent: number): string => {
    const sign = percent >= 0 ? '+' : '';
    return `(${sign}${percent.toFixed(2)}%)`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.priceSection}>
        <Text style={styles.price}>{formatPrice(priceData.price)}</Text>
        <Text style={[styles.change, priceData.change >= 0 ? styles.changeGreen : styles.changeRed]}>
          {formatChange(priceData.change)} {formatChangePercent(priceData.changePercent)}
        </Text>
      </View>
      <TouchableOpacity style={styles.currencySelector} onPress={onCurrencySelect}>
        <Text style={styles.currencyText}>{selectedCurrencyPair}</Text>
        <ChevronDown size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,  
    paddingVertical: 8,
    height: '100%',
    justifyContent: 'space-between',
  },
  priceSection: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  price: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
  },
  changeGreen: {
    color: '#4ade80',
  },
  changeRed: {
    color: '#f87171',
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currencyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
});

export default PriceDisplay; 
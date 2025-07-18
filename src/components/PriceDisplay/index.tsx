import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

import { formatChange, formatChangePercent, formatNumber } from '@/utils';
import { PriceData, CurrencyPair } from '@/types/trading';
import styles from './styles';

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
  return (
    <View style={styles.container}>
      <View style={styles.priceSection}>
        <Text style={styles.price}>{formatNumber(priceData.price)}</Text>
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

export default PriceDisplay; 
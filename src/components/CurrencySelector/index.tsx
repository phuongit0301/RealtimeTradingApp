import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Bitcoin } from 'lucide-react-native';

import { CurrencyPair } from '@/types/trading';
import styles from './styles';

interface CurrencySelectorProps {
  visible: boolean;
  selectedCurrency: CurrencyPair;
  onSelect: (currency: CurrencyPair) => void;
  onClose: () => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  visible,
  selectedCurrency,
  onSelect,
  onClose,
}) => {
  const currencies: CurrencyPair[] = ['USD/BTC', 'USD/ETH', 'BTC/ETH'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Currency Pair</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Bitcoin size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.currencyList}>
            {currencies.map((currency) => (
              <TouchableOpacity
                key={currency}
                style={[
                  styles.currencyItem,
                  selectedCurrency === currency && styles.currencyItemSelected,
                ]}
                onPress={() => {
                  onSelect(currency);
                  onClose();
                }}
              >
                <Text style={[
                  styles.currencyText,
                  selectedCurrency === currency && styles.currencyTextSelected,
                ]}>
                  {currency}
                </Text>
                {selectedCurrency === currency && (
                  <Bitcoin size={20} color="#4ade80" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CurrencySelector; 
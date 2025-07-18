import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Bitcoin } from 'lucide-react-native';
import { CurrencyPair } from '../types/trading';

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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#16213e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  currencyList: {
    padding: 20,
  },
  currencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#1a1a2e',
  },
  currencyItemSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  currencyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  currencyTextSelected: {
    color: '#3b82f6',
    fontWeight: '600',
  },
});

export default CurrencySelector; 
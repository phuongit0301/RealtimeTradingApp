import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Menu } from 'lucide-react-native';

interface HeaderProps {
  onMenuPress?: () => void;
  onSharePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuPress, onSharePress }) => {

  return (
    <View style={styles.container}>
      <View style={styles.statusBar} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Menu size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Trading Details</Text>
        <TouchableOpacity style={styles.shareButton} onPress={onSharePress}>
          <Camera size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
  },
  statusBar: {
    height: 44,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a2e',
  },
  time: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  menuButton: {
    padding: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  shareButton: {
    padding: 4,
  },
});

export default Header; 
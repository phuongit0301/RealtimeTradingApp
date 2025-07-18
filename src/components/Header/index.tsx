import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Menu } from 'lucide-react-native';

import styles from './styles';

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


export default Header; 
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

export const ChatHeader = () => {
  return (
    <View style={styles.header}>
      <Ionicons name="arrow-back-outline" style={styles.backMenu} size={30} color="white" />
      <Text style={styles.headerText}>Geppeto Assistant</Text>
    </View>
  );
};
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import * as SecureStore from 'expo-secure-store';

export const ChatHeader = ({ actualScreen, navigateTo }) => {
	const goBack = async () => {
		if(actualScreen === 'ChatMenu') {
			await SecureStore.setItemAsync('authToken', '');
			navigateTo('login');
		} else if(actualScreen === 'Chat') {
			navigateTo('chatMenu');
		}
	};

	return (
		<View style={styles.header}>
			<Ionicons name="arrow-back-outline" style={styles.backMenu} size={30} color="white" onPress={goBack} />
			<Text style={styles.headerText}>Geppeto Assistant</Text>
		</View>
	);
};
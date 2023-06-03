import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigator } from '../../utils/Navigator';
import { styles } from './styles';

export const ChatHeader = ({ actualScreen }) => {
	const navigator = useNavigator();

	const goBack = () => {
		if(actualScreen === 'ChatMenu') {
			navigator.navigateToLogin();
		} else if(actualScreen === 'Chat') {
			navigator.navigateToChatMenu();
		}
	};

	return (
		<View style={styles.header}>
			<Ionicons name="arrow-back-outline" style={styles.backMenu} size={30} color="white" onPress={goBack} />
			<Text style={styles.headerText}>Geppeto Assistant</Text>
		</View>
	);
};
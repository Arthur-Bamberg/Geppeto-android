import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import * as SecureStore from 'expo-secure-store';

export const ChatHeader = ({ actualScreen, navigateTo, isUserScreen = false }) => {

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', goBack);

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', goBack);
		};
	}, []);
	  
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
			{!isUserScreen ? 
				<Ionicons name="person" size={27} color="white" onPress={()=>navigateTo('user')} />
				: <View style={{width: 27}}></View>
			}
		</View>
	);
};
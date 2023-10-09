import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { LoginScreen } from './screens/login';
import { ChatScreen } from './screens/chat';
import { ChatMenuScreen } from './screens/chatMenu';
import { useFonts } from 'expo-font';

export default function App() {
	const [screen, setScreen] = useState('login');
	const [idSection, setIdSection] = useState(0);

	const [fontsLoaded] = useFonts({
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
		'Caveat': require('./assets/fonts/Caveat.ttf'),
	});
	if (!fontsLoaded) {
		return null; // TODO: Add a loading screen
	}
	
	return (
		<>
			<StatusBar style="auto" />
			{screen === 'login' && <LoginScreen navigateTo={setScreen} setIdSection={setIdSection}/>}
			{screen === 'chatMenu' && <ChatMenuScreen navigateTo={setScreen} setIdSection={setIdSection}/>}
			{screen === 'chat' && <ChatScreen navigateTo={setScreen} idSection={idSection}/>}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { LoginScreen } from './screens/login';
import { ChatScreen } from './screens/chat';
import { ChatMenuScreen } from './screens/chatMenu';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
	const [fontsLoaded] = useFonts({
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
		'Caveat': require('./assets/fonts/Caveat.ttf'),
	});

	const Stack = createStackNavigator();

	if (!fontsLoaded) {
		return null; // TODO: Add a loading screen
	}

	return (
		<NavigationContainer style={styles.container} >
				<StatusBar style="auto" />
				<Stack.Navigator 
					initialRouteName="Login"
					screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="ChatMenu" component={ChatMenuScreen} />
					<Stack.Screen name="Chat" component={ChatScreen} />
				</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

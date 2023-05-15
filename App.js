import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { LoginScreen } from './screens/login/login';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Caveat': require('./assets/fonts/Caveat.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or render a loading indicator
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

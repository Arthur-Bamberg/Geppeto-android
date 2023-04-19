import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function TextButton() {
  return <Text>Click me!</Text>;
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <StatusBar style="auto" />
      <TextButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24232A',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

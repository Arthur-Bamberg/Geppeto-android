import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      width: '100%'
    },
    header: {
      backgroundColor: colors.header,
      paddingVertical: 20,
    },
    headerText: {
      textAlign: 'center',
      color: colors.text,
      fontSize: 24,
      fontWeight: 'bold',
    },
    image: {
      width: 200,
      height: 200,
    },
    form: {
      marginTop: 50,
    },
    input: {
      backgroundColor: colors.textBubble,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 20,
      color: colors.text,
    },
    button: {
      backgroundColor: colors.accent,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
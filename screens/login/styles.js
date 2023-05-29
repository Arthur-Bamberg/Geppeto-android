import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      width: '100%'
    },
    header: {
      marginTop: 50,
      width: '60%',
      paddingVertical: 10,
      backgroundColor: colors.header,
      alignSelf: 'center',
      borderRadius: 10,
    },
    headerText: {
      textAlign: 'center',
      color: colors.text,
      fontFamily: 'Caveat',
      fontSize: 30,
      fontWeight: 'bold',
    },
    image: {
      marginBottom: 25,
      width: '50vw',
      maxWidth: '50vh',
      height: '50vh',
      maxHeight: '50vw',
      alignSelf: 'center',
    },
    form: {
      marginTop: '50px',
      paddingHorizontal: 20,
    },
    input: {
      fontFamily: 'Roboto-Regular',
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
    registerButton: {
      marginBottom: 20,
    },
    registerText: {
      color: colors.header,
      textDecorationLine: 'underline',
    }
  });
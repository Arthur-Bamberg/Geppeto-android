import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    errorModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    errorModalContent: {
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#8B0000',
        alignItems: 'center',
    },
    warningIcon: {
        marginBottom: 10,
    },
    errorText: {
        fontFamily: 'Roboto-Regular',
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Roboto-Regular',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    text: {
        color: 'white'
    }
});  
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    TextInputModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    TextInputModalContent: {
        minWidth: 250,
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: colors.header,
        alignItems: 'center',
    },
    warningIcon: {
        marginBottom: 10,
    },
    TextInputText: {
        fontFamily: 'Roboto-Regular',
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
    },
    inputText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular',
    },
    viewButtons: {
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    button: {
        marginHorizontal: 10,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonAccept: {
        backgroundColor: 'green',
    },
    buttonDeny: {
        backgroundColor: 'red',
    },
    text: {
        color: 'white'
    }
});  
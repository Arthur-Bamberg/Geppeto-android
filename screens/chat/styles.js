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
        paddingVertical: 10,
        alignItems: 'center',
    },
    headerText: {
        color: colors.text,
        fontFamily: 'Caveat',
        fontSize: 18,
        fontWeight: 'bold',
    },
    chatContainer: {
        flex: 1,
        padding: 10,
    },
    messageBubble: {
        backgroundColor: colors.textBubble,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        maxWidth: '70%',
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: colors.accent,
    },
    receivedMessage: {
        alignSelf: 'flex-start',
    },
    messageText: {
        color: colors.text,
        fontFamily: 'Roboto-Regular',
    },
});
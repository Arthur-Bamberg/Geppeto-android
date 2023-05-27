import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        width: '100%'
    },
    header: {
        position: 'fixed',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        zIndex: 1,
        backgroundColor: colors.header,
        paddingVertical: 10,
        alignItems: 'center',
    },
    backMenu: {
        marginLeft: 10,
    },
    headerText: {
        textAlign: 'center',
        width: '100%',
        marginRight: 50,
        color: colors.text,
        fontFamily: 'Caveat',
        fontSize: 24,
        fontWeight: 'bold',
    },
    chatContainer: {
        marginTop: 50,
        marginBottom: 30,
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
    inputContainer: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sendButton: {
        backgroundColor: colors.accent,
        padding: 10,
        borderRadius: 7,
    },
    input: {
        width: '100%',
        color: colors.text,
        backgroundColor: colors.textBubble,
        fontFamily: 'Roboto-Regular',
        paddingVertical: 10,
        borderRadius: 7,
    }
});
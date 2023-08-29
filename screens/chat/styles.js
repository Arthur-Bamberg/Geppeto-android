import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        width: '100%'
    },
    chatContainer: {
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
    flatList: {
        marginBottom: -40
    },
    inputContainer: {
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    recordAudio: {
        marginBottom: 5,
        paddingVertical: 13,
        backgroundColor: colors.header,
        padding: 10,
    },
    sendButton: {
        marginRight: 5,
        marginBottom: 5,
        paddingVertical: 13,
        backgroundColor: colors.accent,
        padding: 10,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
    },
    input: {
        width: '76%',
        marginBottom: 5,
        marginLeft: 5,
        paddingLeft: 10,
        color: colors.text,
        backgroundColor: colors.textBubble,
        fontFamily: 'Roboto-Regular',
        paddingVertical: 10,
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
    }
});
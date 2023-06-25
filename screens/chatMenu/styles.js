import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: colors.background,
    },
    chatItemsContainer: {
        marginTop: 50,
    },
    chatItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 2,
        borderBottomColor: colors.header,
    },
    chatIcon: {
        color: colors.header,
    },
    trashIcon: {
        color: colors.header,
        marginLeft: 'auto',
    },
    chatText: {
        marginLeft: 10,
        fontSize: 16,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontFamily: 'Roboto-Regular',
        color: colors.text,
    },
    nameHighlight: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
    },
    plusButton: {
        position: 'fixed',
        bottom: 50,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.accent,
    },
    plusText: {
        textAlign: 'center',
        fontSize: 30,
        color: colors.text
    }
});
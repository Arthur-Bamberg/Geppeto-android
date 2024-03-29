import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: colors.background,
    },
    chatItemsContainer: {
        marginBottom: -50,
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
    iconsView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: 'auto',
    },
    pencilIcon: {
        color: colors.header,
        marginRight: 10,
    },
    trashIcon: {
        color: colors.header,
    },
    chatText: {
        marginLeft: 10,
        fontSize: 16,
        maxWidth: '70%',
        overflow: 'hidden',
        fontFamily: 'Roboto-Regular',
        color: colors.text,
    },
    nameHighlight: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
    },
    plusButton: {
        bottom: 20,
        left: 325,
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: colors.accent,
    },
    plusText: {
        marginTop: 3,
        textAlign: 'center',
        fontSize: 30,
        color: colors.text
    }
});
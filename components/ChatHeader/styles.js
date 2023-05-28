import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
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
});
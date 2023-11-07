import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        zIndex: 1,
        backgroundColor: colors.header,
        paddingTop: 35,
        paddingBottom: 15,
        alignItems: 'center',
    },
    backMenu: {
        marginLeft: 10,
        marginRight: 50,
    },
    headerText: {
        marginRight: 50,
        color: colors.text,
        fontFamily: 'Caveat',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
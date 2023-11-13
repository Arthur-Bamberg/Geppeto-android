import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 1,
        backgroundColor: colors.header,
        paddingTop: 35,
        paddingBottom: 15,
        alignItems: 'center',
    },
    headerText: {
        color: colors.text,
        fontFamily: 'Caveat',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
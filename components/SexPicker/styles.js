import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text,
        fontSize: 18,
        paddingBottom: 5,
    },
    input: {
        fontFamily: 'Roboto-Regular',
        backgroundColor: colors.textBubble,
        paddingHorizontal: 20,
        marginBottom: 20,
        color: colors.text,
    }
});
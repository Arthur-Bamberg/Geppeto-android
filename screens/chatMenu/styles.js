import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: colors.background,
    },
    chatItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.textBubble,
    },
    chatName: {
        color: colors.text,
    },
});
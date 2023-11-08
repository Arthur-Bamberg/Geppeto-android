import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		width: '100%'
	},
	form: {
		marginTop: 20,
		paddingHorizontal: 20,
	},
	inputContainer: {
		position: 'relative',
	},
	input: {
		fontFamily: 'Roboto-Regular',
		backgroundColor: colors.textBubble,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		marginBottom: 20,
		color: colors.text,
	},
	text: {
		backgroundColor: 'rgba(0, 0, 0, 0.3)'
	},
	button: {
		backgroundColor: colors.accent,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	deleteButton: {
		marginTop: 80,
		backgroundColor: '#ae2c21'
	},
	buttonText: {
		color: colors.text,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	registerButton: {
		backgroundColor: colors.header,
		marginBottom: 20,
	},
	loading: {
		paddingTop: 100,
	},
});
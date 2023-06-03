import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigator } from '../../utils/Navigator';
import { styles } from './styles';
import { ErrorModal } from '../../components/ErrorModal';

export const LoginScreen = () => {
	const [mode, setMode] = useState('Login');
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const navigator = useNavigator();

	const validateEmail = (email) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const validatePassword = (password) => { //ExamplePassword123!
		// TODO: Add password requirements to the error modal
		// Password requirements:
		// - At least 8 characters long
		// - Contains at least one uppercase letter
		// - Contains at least one lowercase letter
		// - Contains at least one digit
		// - Contains at least one special character
		const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordPattern.test(password);
	};

	const toggleErrorModal = () => {
		setErrorModalVisible(!errorModalVisible);
	};

	const handleError = (errorMessage) => {
		setErrorMessage(errorMessage);
		setErrorModalVisible(true);
	};

	const handleLogin = () => {
		if (!validateEmail(email)) {
			handleError('Please enter a valid email address.');
		} else if (!validatePassword(password)) {
			handleError('Please enter a valid password.');
		} else {
			navigator.navigateToChatMenu();
		}
	};

	const handleRegister = () => {
		if (!validateEmail(email)) {
			handleError('Please enter a valid email address.');
		} else if (!validatePassword(password)) {
			handleError('Please enter a valid password.');
		} else if (fullName.trim() === '') {
			handleError('Please enter your full name.');
		} else {
			navigator.navigateToChat(0);
		}
	};

	const changeMode = () => {
		if (mode === 'Login') {
			setMode('Register');
		} else {
			setMode('Login');
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					source={require('../../assets/logo.png')}
					style={styles.image}
					resizeMode="contain"
					accessibilityLabel="The 3D icon for an old white-haired man"
				/>
				<Text style={styles.headerText}>Geppeto Assistant</Text>
			</View>
			<View style={styles.form}>
				<TouchableOpacity style={styles.registerButton} onPress={changeMode}>
					<Text style={[styles.buttonText, styles.registerText]}>
						{
							mode === 'Login' ?
								"Don't have an account? Register here."
								:
								'Already have an account? Login here.'
						}
					</Text>
				</TouchableOpacity>
				{mode === 'Register' ?
					<TextInput
						style={styles.input}
						placeholder="Full Name"
						value={fullName}
						onChangeText={setFullName}
					/>
					:
					null
				}
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
				<TouchableOpacity style={styles.button} onPress={
					mode === 'Register' ?
						handleRegister
						:
						handleLogin
				}>
					<Text style={styles.buttonText}>{mode}</Text>
				</TouchableOpacity>
			</View>
			<ErrorModal errorMessage={errorMessage} toggleErrorModal={toggleErrorModal} errorModalVisible={errorModalVisible} />
		</View>
	);
};

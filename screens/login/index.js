import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigator } from '../../utils/Navigator';
import { styles } from './styles';
import { ErrorModal } from '../../components/ErrorModal';

export const LoginScreen = () => {
	const [mode, setMode] = useState('Login');
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');

	const [passwordVisibility, setPasswordVisibility] = useState(false);
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

	const handleResetPassword = () => {
		if (!validateEmail(email)) {
			handleError('Please enter a valid email address.');
		} else if (fullName.trim() === '') {
			handleError('Please enter your full name.');
		} else {
			changeMode('Login');
		}
	};

	const changeMode = (newMode = null) => {
		if (typeof newMode !== 'string') {
			newMode = mode === 'Register' ? 'Login' : 'Register';
		}
		setMode(newMode);
	};

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
					<View>
						<Text style={[styles.buttonText, styles.registerText]}>
							{mode === 'Register' ?
								'Already have an account? Login here.' :
								"Don't have an account? Register here."}
						</Text>
					</View>
				</TouchableOpacity>
				{mode !== 'Login' ? (
					<TextInput
						style={styles.input}
						placeholder="Full Name"
						value={fullName}
						onChangeText={setFullName}
					/>
				) : null}
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
				/>
				{mode !== 'Reset password' ? (
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder="Password"
							secureTextEntry={!passwordVisibility}
							value={password}
							onChangeText={setPassword}
						/>
						<Ionicons
							style={styles.visibilityIcon}
							onPress={() => setPasswordVisibility(!passwordVisibility)}
							name="eye"
							size={30}
						/>
					</View>
				) : null}
				{mode === 'Login' ? (
					<TouchableOpacity
						style={styles.registerButton}
						onPress={() => {
							changeMode('Reset password');
						}}
					>
						<Text style={[styles.buttonText, styles.registerText]}>
							Forgot your password?
						</Text>
					</TouchableOpacity>
				) : null}
				<TouchableOpacity
					style={styles.button}
					onPress={
						mode === 'Register'
							? handleRegister
							: mode === 'Reset password'
								? handleResetPassword
								: handleLogin
					}
				>
					<Text style={styles.buttonText}>{mode}</Text>
				</TouchableOpacity>
			</View>
			<ErrorModal errorMessage={errorMessage} toggleErrorModal={toggleErrorModal} errorModalVisible={errorModalVisible} />
		</View>
	);
};

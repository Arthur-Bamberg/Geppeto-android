import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigator } from '../../utils/Navigator';
import { styles } from './styles';
import { ErrorModal } from '../../components/ErrorModal';
import { UserService } from '../../services/UserService';
import * as SecureStore from 'expo-secure-store';
import text from './texts.json';

export const LoginScreen = () => {
	const [mode, setMode] = useState(text.login);
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');

	const [passwordVisibility, setPasswordVisibility] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const navigator = useNavigator();

	const validateEmail = (email) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const validatePassword = (password) => {
		// TODO: Add password requirements to the error modal
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
			handleError(text.email_error);
		} else if (!validatePassword(password)) {
			handleError(text.password_error);
		} else {
			navigator.navigateToChatMenu();
		}
	};

	const handleRegister = async () => {
		if (!validateEmail(email)) {
			handleError(text.email_error);
		} else if (!validatePassword(password)) {
			handleError(text.password_error);
		} else if (fullName.trim() === '') {
			handleError(text.fullName_error);
		} else if (password !== confirmPassword) {
			handleError(text.password_match_error);
		} else {
			const { token } = await UserService.register(fullName, email, password);
			await SecureStore.setItemAsync(
				'authToken',
				token
			);
			console.log(await SecureStore.getItemAsync('authToken'));
			navigator.navigateToChat(0);
		}
	};

	const handleResetPassword = () => {
		if (!validateEmail(email)) {
			handleError(text.email_error);
		} else if (fullName.trim() === '') {
			handleError(text.fullName_error);
		} else {
			changeMode(text.login);
		}
	};

	const changeMode = (newMode = null) => {
		if (typeof newMode !== 'string') {
			newMode = mode === text.register ? text.login : text.register;
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
				<TouchableOpacity style={[styles.button, styles.registerButton]} onPress={changeMode}>
					<View>
						<Text style={[styles.buttonText, styles.buttonText]}>
							{mode === text.register ? text.login_text : text.register_text}
						</Text>
					</View>
				</TouchableOpacity>
				{mode !== text.login ? (
					<TextInput
						style={styles.input}
						placeholder={text.fullName}
						value={fullName}
						onChangeText={setFullName}
					/>
				) : null}
				<TextInput
					style={styles.input}
					placeholder={text.email}
					value={email}
					onChangeText={setEmail}
				/>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder={text.password}
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
				{mode === text.register ? (
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder={text.confirm_password}
							secureTextEntry={!passwordVisibility}
							value={confirmPassword}
							onChangeText={setConfirmPassword}
						/>
						<Ionicons
							style={styles.visibilityIcon}
							onPress={() => setPasswordVisibility(!passwordVisibility)}
							name="eye"
							size={30}
						/>
					</View>
				) : null}
				{mode === text.login ? (
					<TouchableOpacity
						style={[styles.button, styles.registerButton]}
						onPress={() => {
							changeMode(text.reset_password);
						}}
					>
						<Text style={[styles.buttonText, styles.buttonText]}>
							{text.reset_password_text}
						</Text>
					</TouchableOpacity>
				) : null}
				<TouchableOpacity
					style={styles.button}
					onPress={
						mode === text.register
							? handleRegister
							: mode === text.reset_password
								? handleResetPassword
								: handleLogin
					}
				>
					<Text style={styles.buttonText}>{mode}</Text>
				</TouchableOpacity>
			</View>
			<ErrorModal
				errorMessage={errorMessage}
				toggleErrorModal={toggleErrorModal}
				errorModalVisible={errorModalVisible}
			/>
		</View>
	);
};

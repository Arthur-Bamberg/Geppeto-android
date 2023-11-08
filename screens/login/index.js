import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { LoadingAnimation } from '../../components/LoadingAnimation';
import { SexPicker } from '../../components/SexPicker';
import { ErrorModal } from '../../components/ErrorModal';
import { CodeAuthor } from '../../components/CodeAuthor';
import { UserService } from '../../services/UserService';
import { SectionService } from '../../services/SectionService';
import * as SecureStore from 'expo-secure-store';
import text from './texts.json';

export const LoginScreen = ({ navigateTo, setIdSection }) => {
	const nameInput = useRef(null);
	const cityInput = useRef(null);
	const emailInput = useRef(null);
	const passwordInput = useRef(null);
	const confirmPasswordInput = useRef(null);

	const [marginTop, setMarginTop] = useState(50);
	const [mode, setMode] = useState(text.login);
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [city, setCity] = useState('');
	const [sex, setSex] = useState(null);

	const [loading, setLoading] = useState(false);

	const [passwordVisibility, setPasswordVisibility] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		(async () => {
			setLoading(true);

			const token = await SecureStore.getItemAsync('authToken');

			setLoading(false);

			if (token) {
				navigateTo('chatMenu');
			}
		})();
	}, []);

	const validateEmail = (email) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const validatePassword = (password) => {
		const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
			;
		return passwordPattern.test(password);
	};

	const toggleErrorModal = () => {
		setErrorModalVisible(!errorModalVisible);
	};

	const handleError = (errorMessage) => {
		setErrorMessage(errorMessage);
		setErrorModalVisible(true);
	};

	const handleLogin = async () => {
		if (!validateEmail(email)) {
			handleError(text.email_error);
		} else if (password.trim() === '') {
			handleError(text.password_error);
		} else {
			setLoading(true);

			try {
				await UserService.login(email, password);

				setLoading(false);

				setFullName('');
				setEmail('');
				setPassword('');
				setConfirmPassword('');

				navigateTo('chatMenu');
			} catch (error) {
				setLoading(false);
				handleError(error.response.data.message.pt ?? error.response.data.message);
			}
		}
	};

	const handleSubmit = (nextInput, submitFunction) => {
		if (!nextInput) {
			submitFunction();

		} else {
			nextInput.current.focus();
		}
	}

	const handleRegister = async () => {
		if (!validateEmail(email)) {
			handleError(text.email_error);
		} else if (!validatePassword(password)) {
			handleError(text.password_error);
		} else if (fullName.trim() === '') {
			handleError(text.fullName_error);
		} else if (city.trim() === '') {
			handleError(text.city_error);
		} else if (password !== confirmPassword) {
			handleError(text.password_match_error);
		} else {
			setLoading(true);

			try {
				if (await UserService.register(fullName, city, sex, email, password)) {
					const section = await SectionService.create();

					setLoading(false);

					setIdSection(section.idSection);

					navigateTo('chat');
				} else {
					setLoading(false);

					handleError(text.register_error);
				}
			} catch (error) {
				setLoading(false);
				handleError(error.response.data.message.pt ?? error.response.data.message);
			}
		}
	};

	const handleResetPassword = async () => {
		if (!validateEmail(email)) {
			handleError(text.email_error);
		} else if (fullName.trim() === '') {
			handleError(text.fullName_error);
		} else {
			setLoading(true);

			try {
				if (!await UserService.resetPassword(fullName, email)) {
					throw new Error();
				}

				Alert.alert(text.reset_password_title, text.reset_password_message, [
					{ text: 'OK' }
				]);

				setLoading(false);

				changeMode(text.login);
			} catch (error) {
				setLoading(false);
				handleError(error.response.data.message.pt ?? error.response.data.message);
			}
		}
	};

	const changeMode = (newMode = null) => {
		setMarginTop(50);
		Keyboard.dismiss();

		if (typeof newMode !== 'string') {
			newMode = mode === text.register ? text.login : text.register;
		}
		setMode(newMode);
	};

	return (
		<ScrollView style={styles.container}>
			<View style={[styles.header, { marginTop }]}>
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
						ref={nameInput}
						onSubmitEditing={() => {
							if (mode !== text.register) {
								handleSubmit(emailInput);
							} else {
								handleSubmit(cityInput);
							}
						}}
					/>
				) : null}
				{mode === text.register && (
					<>
						<TextInput
							style={styles.input}
							placeholder={text.city}
							value={city}
							onChangeText={setCity}
							ref={cityInput}
							onSubmitEditing={() => handleSubmit(emailInput)}
							onFocus={() => setMarginTop(0)}
						/>
						<SexPicker selectedSex={sex} setSelectedSex={setSex} />
					</>
				)}
				<TextInput
					style={styles.input}
					placeholder={text.email}
					value={email}
					onChangeText={setEmail}
					ref={emailInput}
					onFocus={() => {
						if (mode === text.register) {
							setMarginTop(-150);
						} else if (mode === text.reset_password) {
							setMarginTop(-30);
						}
					}}
					onBlur={() => setMarginTop(50)}
					onSubmitEditing={() => mode === text.reset_password ?
						handleResetPassword()
						:
						handleSubmit(passwordInput)}
				/>
				{mode !== text.reset_password ? (
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder={text.password}
							secureTextEntry={!passwordVisibility}
							value={password}
							onChangeText={setPassword}
							ref={passwordInput}
							onFocus={() => {
								if (mode === text.login) {
									setMarginTop(-100);
								} else {
									setMarginTop(-210);
								}
							}}
							onBlur={() => setMarginTop(50)}
							onSubmitEditing={() => {
								if (mode === text.register) {
									handleSubmit(confirmPasswordInput);
								} else {
									handleSubmit(null, handleLogin);
								}
							}}
						/>
						<Ionicons
							style={styles.visibilityIcon}
							onPress={() => setPasswordVisibility(!passwordVisibility)}
							name="eye"
							size={30}
						/>
					</View>
				) : null}
				{mode === text.register ? (
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder={text.confirm_password}
							secureTextEntry={!passwordVisibility}
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							ref={confirmPasswordInput}
							onFocus={() => setMarginTop(-350)}
							onBlur={() => setMarginTop(50)}
							onSubmitEditing={() => handleSubmit(null, handleRegister)}
						/>
						<Ionicons
							style={styles.visibilityIcon}
							onPress={() => setPasswordVisibility(!passwordVisibility)}
							name="eye"
							size={30}
						/>
					</View>
				) : null}
				{mode === text.login && !loading && (
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
				)}
				{loading ? <LoadingAnimation style={styles.loading} />
					: (
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
					)}
			</View>
			<CodeAuthor />
			<ErrorModal
				errorMessage={errorMessage}
				toggleErrorModal={toggleErrorModal}
				errorModalVisible={errorModalVisible}
			/>
		</ScrollView>
	);
};

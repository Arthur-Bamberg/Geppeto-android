import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ChatHeader } from '../../components/ChatHeader';
import { styles } from './styles';
import { LoadingAnimation } from '../../components/LoadingAnimation';
import { ErrorModal } from '../../components/ErrorModal';
import { SexPicker } from '../../components/SexPicker';
import { UserService } from '../../services/UserService';
import text from './texts.json';

export const UserScreen = ({ navigateTo, setIdSection }) => {
	const [firstLoading, setFirstLoading] = useState(false);
	const [fullName, setFullName] = useState('');
	const [city, setCity] = useState('');
	const [sex, setSex] = useState(null);
	const [email, setEmail] = useState('');

	const [loading, setLoading] = useState(false);

	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const validateEmail = (email) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const toggleErrorModal = () => {
		setErrorModalVisible(!errorModalVisible);
	};

	const handleError = (errorMessage) => {
		setErrorMessage(errorMessage);
		setErrorModalVisible(true);
	};

	const handleRegister = async () => {
		if (!validateEmail(email)) {
			handleError(text.email_error);
		} else {
			setLoading(true);

			try {
				if (await UserService.register(fullName, email, password)) {
					const section = await SectionService.create();

					setLoading(false);

					setIdSection(section.idSection);

					navigateTo('chat');
				} else {
					setLoading(false);

					handleError(text.save_error);
				}
			} catch (error) {
				setLoading(false);
				handleError(error.response.data.message.pt ?? error.response.data.message);
			}
		}
	};

	return (
		<View style={styles.container}>
			<ChatHeader actualScreen={'Chat'} navigateTo={navigateTo} isUserScreen={true} />
			{firstLoading ? <LoadingAnimation /> : (
				<View style={styles.form}>
					<TextInput
						style={styles.input}
						placeholder={text.fullName}
						value={fullName}
						onChangeText={setFullName}
					/>
					<TextInput
						style={styles.input}
						placeholder={text.city}
						value={city}
						onChangeText={setCity}
					/>
					<SexPicker selectedSex={sex} setSelectedSex={setSex} />
					<Text style={[styles.input, styles.text]}>{email}</Text>
					{loading ? <LoadingAnimation style={styles.loading} />
						: (
							<TouchableOpacity
								style={styles.button}
								onPress={handleRegister}
							>
								<Text style={styles.buttonText}>{text.save}</Text>
							</TouchableOpacity>
						)}
				</View>
			)}
			<ErrorModal
				errorMessage={errorMessage}
				toggleErrorModal={toggleErrorModal}
				errorModalVisible={errorModalVisible}
			/>
		</View>
	);
};

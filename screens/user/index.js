import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ChatHeader } from '../../components/ChatHeader';
import { styles } from './styles';
import { LoadingAnimation } from '../../components/LoadingAnimation';
import { ErrorModal } from '../../components/ErrorModal';
import { SexPicker } from '../../components/SexPicker';
import { CodeAuthor } from '../../components/CodeAuthor';
import { UserService } from '../../services/UserService';
import text from './texts.json';

export const UserScreen = ({ navigateTo }) => {
	const [firstLoading, setFirstLoading] = useState(true);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [fullName, setFullName] = useState('');
	const [city, setCity] = useState('');
	const [sex, setSex] = useState(null);
	const [email, setEmail] = useState('');

	const [loading, setLoading] = useState(false);

	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (firstLoading) {
			getUser();
		}
	}, []);

	const getUser = async () => {
		try {
			const user = await UserService.get();
			setFullName(user.name);
			setCity(user.city);
			setSex(user.sex);
			setEmail(user.email);

			setFirstLoading(false);

		} catch (error) {
			setFirstLoading(false);

			handleError(error.response.data.message.pt ?? error.response.data.message);
		}
	};

	const toggleErrorModal = () => {
		setErrorModalVisible(!errorModalVisible);
	};

	const handleError = (errorMessage) => {
		setErrorMessage(errorMessage);
		setErrorModalVisible(true);
	};

	const handleUpdate = async () => {
		if (fullName.trim() === '') {
			handleError(text.fullName_error);
		} else if (city.trim() === '') {
			handleError(text.city_error);
		} else {
			setLoading(true);

			try {
				await UserService.update(fullName, city, sex);

				setLoading(false);

			} catch (error) {
				setLoading(false);
				handleError(error.response.data.message.pt ?? error.response.data.message);
			}
		}
	};

	const handleDelete = async () => {
		try {
			Alert.alert(text.delete_account, text.delete_account_confirmation, [
				{
					text: 'Sim', onPress: async () => {
						setDeleteLoading(true);

						await UserService.delete();

						setDeleteLoading(false);

						navigateTo('login');
					}
				},
				{ text: 'Não' }
			]);
		} catch (error) {
			setDeleteLoading(false);
			handleError(error.response.data.message.pt ?? error.response.data.message);
		}
	};

	return (
		<View style={styles.container}>
			<ChatHeader actualScreen={'Chat'} navigateTo={navigateTo} isUserScreen={true} />
			<View style={styles.form}>
				{firstLoading ? <LoadingAnimation /> : (
					<>
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
									onPress={handleUpdate}
								>
									<Text style={styles.buttonText}>{text.save}</Text>
								</TouchableOpacity>
							)}
						{deleteLoading ? <LoadingAnimation /> :
							<TouchableOpacity
								onPress={handleDelete}
								style={[styles.button, styles.deleteButton]}>
								<Text style={styles.buttonText}>{text.delete_account}</Text>
							</TouchableOpacity>}
						<CodeAuthor />
					</>
				)}
			</View>
			<ErrorModal
				errorMessage={errorMessage}
				toggleErrorModal={toggleErrorModal}
				errorModalVisible={errorModalVisible}
			/>
		</View>
	);
};

import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import * as config from './config.json';

export class UserService {
	static authenticateUrl = `${config.api_endpoint}/auth`;
	static userUrl = `${config.api_endpoint}/users`;
	static resetPasswordUrl = `${config.api_endpoint}/send-email`;

	static async register(name, city, sex, email, password) {
		const { data } = await axios.post(UserService.userUrl, {
			name,
			city,
			sex,
			email,
			password
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		await SecureStore.setItemAsync(
			'authToken',
			data.token
		);

		return true;
	}

	static async login(email, password) {
		const { data } = await axios.post(UserService.authenticateUrl, {
			email,
			password
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		await SecureStore.setItemAsync(
			'authToken',
			data.token
		);
	}

	static async get() {
		const token = await SecureStore.getItemAsync('authToken');

		const { data } = await axios.get(UserService.userUrl, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		return data;
	}

	static async update(name, city, sex) {
		const token = await SecureStore.getItemAsync('authToken');

		const { data } = await axios.put(UserService.userUrl, {
			name,
			city,
			sex
		}, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		await SecureStore.setItemAsync(
			'authToken',
			data.token
		);
	}

	static async delete() {
		const token = await SecureStore.getItemAsync('authToken');

		await axios.delete(UserService.userUrl, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		await SecureStore.deleteItemAsync('authToken');
	}

	static async resetPassword(name, email) {
		const { data } = await axios.post(UserService.resetPasswordUrl, {
			name,
			email
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		return data;
	}
}
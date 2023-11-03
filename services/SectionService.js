import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import * as config from './config.json';

export class SectionService {
    static url = `${config.api_endpoint}/sections`;

    static async get() {
		const token = await SecureStore.getItemAsync('authToken');

        const { data } = await axios.get(SectionService.url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data;
    }

    static async delete(idSection) {
        const token = await SecureStore.getItemAsync('authToken');

        await axios.delete(`${SectionService.url}/${idSection}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static async create() {
        const token = await SecureStore.getItemAsync('authToken');

        const response = await axios.post(SectionService.url, {
            name: 'New Section'
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data;
    }

    static async update(idSection, name) {
        const token = await SecureStore.getItemAsync('authToken');

        const response = await axios.patch(`${SectionService.url}/${idSection}`, {
            name
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data;
    }

    static async getMessages(idSection) {
        const token = await SecureStore.getItemAsync('authToken');

        const { data } = await axios.get(`${SectionService.url}/${idSection}/messages`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data;
    }

    static async logout() {
        await SecureStore.setItemAsync('authToken', '');
    }
}
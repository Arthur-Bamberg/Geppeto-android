import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import * as ip from './ip.json';

export class SectionService {
    static url = `http://${ip.address}:3000/sections`;

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

        try {
            await axios.delete(`${SectionService.url}/${idSection}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    static async create() {
        const token = await SecureStore.getItemAsync('authToken');

        try {
            const response = await axios.post(SectionService.url, {
                name: 'New Section',
                temperature: 0.8
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
    
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async getMessages(idSection) {
        const token = await SecureStore.getItemAsync('authToken');

        try {
            const { data } = await axios.get(`${SectionService.url}/${idSection}/messages`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    static async logout() {
        await SecureStore.setItemAsync('authToken', '');
    }
}
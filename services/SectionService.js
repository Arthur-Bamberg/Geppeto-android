import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export class SectionService {
    static url = 'http://172.16.7.133:3000/sections';

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
            name: 'New Section',
            temperature: 0.8
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data;
    }
}
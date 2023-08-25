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
}
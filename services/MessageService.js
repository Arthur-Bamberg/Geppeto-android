import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import * as config from './config.json';

export class MessageService {
    static url = `${config.api_endpoint}/messages`;

    static async create(message) {
        const token = await SecureStore.getItemAsync('authToken');

        try {
            const response = await axios.post(MessageService.url, 
                message, {
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
}
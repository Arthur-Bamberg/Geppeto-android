import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import * as ip from './ip.json';

export class MessageService {
    static url = `http://${ip.address}:3000/messages`;

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
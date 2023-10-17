import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import * as config from './config.json';

export class UserService {
  static authenticateUrl = `${config.api_endpoint}/auth`;
  static userUrl = `${config.api_endpoint}/users`;

  static async register(name, email, password) {
    try {
      const { data } = await axios.post(UserService.userUrl, {
        name,
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
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  static async login(email, password) {
    try {
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

      return true;
    } catch (error) {
      console.error(error);
      
      return false;
    }
  }
}
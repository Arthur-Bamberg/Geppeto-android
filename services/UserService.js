import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import * as ip from './ip.json';

export class UserService {
  static authenticateUrl = `http://${ip.address}:3000/auth`;
  static userUrl = `http://${ip.address}:3000/users`;

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
    } catch (error) {
      console.error(error);
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
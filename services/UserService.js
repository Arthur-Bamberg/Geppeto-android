import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import * as config from './config.json';

export class UserService {
  static authenticateUrl = `${config.api_endpoint}/auth`;
  static userUrl = `${config.api_endpoint}/users`;
  static resetPasswordUrl = `${config.api_endpoint}/send-email`;

  static async register(name, email, password) {
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
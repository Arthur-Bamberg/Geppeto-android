import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export class UserService {
  static authenticateUrl = 'http://172.16.7.133:3000/auth';
  static userUrl = 'http://172.16.7.133:3000/users';

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
}
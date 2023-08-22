import axios from "axios";

export class UserService {
  static async register(name, email, password) {
    const { data } = await axios.post('http://172.16.7.133:3000/users', {
      name,
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return data;
  }
}
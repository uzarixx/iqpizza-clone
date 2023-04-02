
import $api from './http';


export default class UserFetchService {
  static async login(email: string, password: string) {
    return $api.post('/auth/login', { email, password });
  }

  static async registration(email: string, password: string, name: string, phoneNumber: string) {
    const city = localStorage.getItem('city')
    return $api.post('/auth/registration', {email, password, name, phoneNumber, city})
  }

  static async logout() {
    return $api.post('/auth/logout')
  }
  static async getUser() {
    return $api.post('/auth/refresh');
  }



}
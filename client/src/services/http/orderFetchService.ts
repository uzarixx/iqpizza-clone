import $api from './http';
import { IProduct } from '../../constants/types';


export default class OrderFetchService {
  static async createOrder(name: string, userAmount: number, comment: string, phoneNumber: string, isDelivery: string, address: string, city: string, cart: IProduct[]) {
    return $api.post('/order/create', {
     userName: name, userAmount, comment, phoneNumber, isDelivery: isDelivery === 'true', address, city, orderValue: cart
    });
  }


}
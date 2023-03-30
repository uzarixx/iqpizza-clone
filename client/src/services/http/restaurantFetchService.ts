import $api from './http';


export default class RestaurantFetchService {
  static async getAllRestaurants() {
    return $api.get('/restaurant/get-all-restaurants');
  }

  static async getRestaurant(city: string) {
    return $api.get(`/restaurant/get-restaurant/${city}`);
  }

  static async getRestaurantById(id: string) {
    return $api.get(`/restaurant/get-one-restaurant/${id}`);
  }
}
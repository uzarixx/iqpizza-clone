import $api from './http';


export default class ProductsFetchService {
  static async getAllProducts() {
    return $api.get('/product/all-products');
  }

  static async getProductById(id: number) {
    return $api.get(`/product/get-by-id/${id}`);
  }


  static async getAllAttributes() {
    return $api.get('/product/all-attributes');
  }

  static async getFavorites() {
    return $api.get('/favorites/get-all');
  }

  static async addToFavorite(id: number) {
    return $api.post('/favorites/create', { productId: id });
  }

  static async deleteFavorite(id: number) {
    return $api.delete('/favorites/delete', { data: { productId: id } });
  }

  static async getAllFavoriteProducts() {
    return $api.get('/favorites/get-all-favorite-products');
  }

}
import $api from './http';


export default class ProductsFetchService {
  static async getAllProducts() {
    return $api.get('/product/all-products');
  }

  static async getProductById(id: number) {
    return $api.get(`/product/get-by-id/${id}`);
  }


  static async getAllAttributes() {
    return $api.get('/product/all-attributes')
  }

}
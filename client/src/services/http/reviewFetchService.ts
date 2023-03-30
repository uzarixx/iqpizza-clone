import $api from './http';


export default class ReviewFetchService {
  static async createReview(data: FormData) {
    return $api.post('/review/create-review', data, { headers: { 'content-type': 'miltipart/form-data' } });
  }

}
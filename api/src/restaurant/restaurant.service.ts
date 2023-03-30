import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Restaurant } from './restaurant.model';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Sequelize } from 'sequelize';
import { City } from './city.model';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class RestaurantService {

  constructor(@InjectModel(Restaurant) private restaurantRepository: typeof Restaurant, @InjectModel(City) private cityRepository: typeof City) {
  }


  async createCity(dto: CreateCityDto) {
    const city = await this.cityRepository.create(dto);
    return city;
  }

  async createRestaurant(dto: CreateRestaurantDto) {
    const restaurant = await this.restaurantRepository.create(dto);
    return restaurant;
  }

  async getRestaurant(city: string) {
    const restaurant = await this.restaurantRepository.findAll({ where: { city } });
    if (!restaurant) {
      throw new HttpException('Restaurant is not a found', HttpStatus.NOT_FOUND);
    }
    return restaurant;
  }

  async getOneRestaurant(id: string) {
    const restaurant = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new HttpException('Restaurant is not a found', HttpStatus.NOT_FOUND);
    }
    return restaurant;
  }

  async getAllRestaurants() {
    const restaurants = await this.cityRepository.findAll({
      include: { all: true },
    });
    return restaurants;
  }

}

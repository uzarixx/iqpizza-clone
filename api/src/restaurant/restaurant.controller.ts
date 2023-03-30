import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateCityDto } from './dto/create-city.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {
  }


  @UsePipes(ValidationPipe)
  @Post('/create-restaurant')
  createRestaurant(@Body() dto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(dto);
  }

  @UsePipes(ValidationPipe)
  @Post('/create-city')
  createCity(@Body() dto: CreateCityDto) {
    return this.restaurantService.createCity(dto);
  }

  @Get('/get-restaurant/:city')
  getRestaurant(@Param('city') city: string) {
    return this.restaurantService.getRestaurant(city);
  }

  @Get('/get-one-restaurant/:id')
  getOneRestaurant(@Param('id') id: string) {
    return this.restaurantService.getOneRestaurant(id);
  }

  @Get('/get-all-restaurants')
  getAllRestaurants() {
    return this.restaurantService.getAllRestaurants();
  }

}

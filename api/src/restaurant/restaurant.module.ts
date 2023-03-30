import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Restaurant } from './restaurant.model';
import { City } from './city.model';

@Module({
  providers: [RestaurantService],
  controllers: [RestaurantController],
  imports: [SequelizeModule.forFeature([Restaurant, City])],
})
export class RestaurantModule {
}

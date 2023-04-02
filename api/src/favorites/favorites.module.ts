import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorites } from './favorites.model';
import { ProductsModule } from '../products/products.module';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [JwtModule, SequelizeModule.forFeature([Favorites]), ProductsModule],
})
export class FavoritesModule {
}

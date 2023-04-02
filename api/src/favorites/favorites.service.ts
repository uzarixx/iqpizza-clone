import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Users } from '../users/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { Favorites } from './favorites.model';
import { ProductsService } from '../products/products.service';

@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorites) private favoritesRepository: typeof Favorites, private productsService: ProductsService) {
  }

  async createFavorite(dto: UpdateFavoriteDto, user: Users) {
    const favorite = await this.favoritesRepository.findOne({ where: { productId: dto.productId, userId: user.id } });
    if (favorite) {
      throw new HttpException('Ви вже добавили цю пiцу в улюбленнi', HttpStatus.BAD_REQUEST);
    }
    return this.favoritesRepository.create({ productId: dto.productId, userId: user.id });
  }

  async deleteFavorite(dto: UpdateFavoriteDto, user: Users) {
    const favorite = await this.favoritesRepository.findOne({ where: { productId: dto.productId, userId: user.id } });
    if (!favorite) {
      throw new HttpException('Ви ще не добавили цю пiцу в улюбленнi', HttpStatus.BAD_REQUEST);
    }
    return this.favoritesRepository.destroy({ where: { productId: dto.productId, userId: user.id } });
  }

  async getAllFavorites(user: Users) {
    const favorites = await this.favoritesRepository.findAll({ where: { userId: user.id }, attributes: ['productId'] });
    return favorites.map((el) => el.productId);
  }

  async getAllFavoriteProducts(user: Users) {
    const favorites = await this.favoritesRepository.findAll({ where: { userId: user.id }, attributes: ['productId'] });
    const products = await this.productsService.getProductById(favorites.map((el) => el.productId))
    return products;
  }

}

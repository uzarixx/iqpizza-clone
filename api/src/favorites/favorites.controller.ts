import { Body, Controller, Delete, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { UserAuth } from '../guard/get-auth.decorator';
import { Users } from '../users/users.model';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createFavorite(@Body() dto: UpdateFavoriteDto, @UserAuth() user: Users) {
    return this.favoritesService.createFavorite(dto, user);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  deleteFavorite(@Body() dto: UpdateFavoriteDto, @UserAuth() user: Users) {
    return this.favoritesService.deleteFavorite(dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-all')
  getAllFavorites(@UserAuth() user: Users) {
    return this.favoritesService.getAllFavorites(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-all-favorite-products')
  getAllFavoriteProducts(@UserAuth() user: Users) {
    return this.favoritesService.getAllFavoriteProducts(user)
  }

}

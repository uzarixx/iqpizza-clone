import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Products } from './products.model';
import { ProductsAttributes } from './productsAttributes.model';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
  imports: [JwtModule, SequelizeModule.forFeature([Products, ProductsAttributes])],
})
export class ProductsModule {
}

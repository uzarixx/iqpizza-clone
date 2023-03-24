import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import * as process from 'process';
import { Users } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { Products } from './products/products.model';
import { FavoritesModule } from './favorites/favorites.module';
import { Favorites } from './favorites/favorites.model';
import { ProductsAttributes } from './products/productsAttributes.model';
import { OrdersModule } from './orders/orders.module';
import { Orders } from './orders/orders.model';
import { OrderValue } from './orders/orderValue.model';
import { OrderProductsAttributes } from './orders/orderProductAttributes.model';
import { JwtTokensModule } from './jwt-tokens/jwt-tokens.module';
import { JwtTokens } from './jwt-tokens/jwt-tokens.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Users, Products, Favorites, ProductsAttributes, OrderValue, Orders, OrderProductsAttributes, JwtTokens],
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    FavoritesModule,
    OrdersModule,
    JwtTokensModule,
  ],
})
export class AppModule {
}

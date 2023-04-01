import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orders } from './orders.model';
import { OrderValue } from './orderValue.model';
import { OrderProductsAttributes } from './orderProductAttributes.model';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [SequelizeModule.forFeature([Orders, OrderValue, OrderProductsAttributes]), JwtModule, ProductsModule, UsersModule],
})
export class OrdersModule {
}

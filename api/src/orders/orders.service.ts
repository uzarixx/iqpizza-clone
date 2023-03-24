import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orders } from './orders.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderValue } from './orderValue.model';
import { OrderProductsAttributes } from './orderProductAttributes.model';
import { Users } from '../users/users.model';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Orders) private ordersRepository: typeof Orders,
    @InjectModel(OrderValue) private orderValueRepository: typeof OrderValue,
    @InjectModel(OrderProductsAttributes) private orderProductsAttrRepository: typeof OrderProductsAttributes,
    private productService: ProductsService,
  ) {
  }

  async createOrder(dto: CreateOrderDto, user: Users) {
    const order = await this.ordersRepository.create({ ...dto, status: 'Готовится', userId: user.id });
    const orderValue = await this.orderValueRepository.bulkCreate(dto.orderValue.map((el) => ({
      ...el,
      orderId: order.id,
    })));
    const array = dto.orderValue.flatMap((el, index) => el.productAttributes.map((el) => ({
      productAttrId: el.productAttrId,
      orderValueId: orderValue[index].id,
    })));
    const orderProductsAttrRepository = await this.orderProductsAttrRepository.bulkCreate(array);
    return { order, orderValue, orderProductsAttrRepository };
  }

  async getOrder(id: number, user: Users) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order || order.userId !== user.id) {
      throw new HttpException('Order is not a found', HttpStatus.NOT_FOUND);
    }
    const orderValue = await this.orderValueRepository.findAll({
      where: { orderId: order.id },
      include: { all: true },
    });
    const products = await this.productService.getProductById(orderValue.map((el) => el.productId));
    const result: object = orderValue.map((el) => ({
      ...el.dataValues,
      pizza: products.filter((product) => product.id === el.productId)[0],
    }));
    return { order, orderMenu: result };
  }

  async successOrder(orderId: number) {
    return this.updateStatusOrder(orderId, 'Виконано');
  }

  async cancelOrder(orderId: number) {
    return this.updateStatusOrder(orderId, 'Скасовано');
  }

  private async updateStatusOrder(orderId: number, status: 'Виконано' | 'Скасовано' | 'Готується') {
    const order = await this.ordersRepository.findOne({ where: { id: orderId } });
    if (!order) {
      throw new HttpException('Order is not a found', HttpStatus.NOT_FOUND);
    }
    order.status = status;
    await order.save();
    return order;
  }


}

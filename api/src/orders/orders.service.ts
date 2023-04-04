import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orders } from './orders.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderValue } from './orderValue.model';
import { OrderProductsAttributes } from './orderProductAttributes.model';
import { Users } from '../users/users.model';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Orders) private ordersRepository: typeof Orders,
    @InjectModel(OrderValue) private orderValueRepository: typeof OrderValue,
    @InjectModel(OrderProductsAttributes) private orderProductsAttrRepository: typeof OrderProductsAttributes,
    private productService: ProductsService,
    private usersService: UsersService,
  ) {
  }

  async createOrder(dto: CreateOrderDto) {
    const user = await this.usersService.findUserByPhone(dto.phoneNumber);
    const resultCalculate = await this.calculationOrderTotal(dto);
    const order = await this.ordersRepository.create({
      ...dto,
      status: 'Готовится',
      userId: user?.id || null,
      orderPrice: resultCalculate,
    });
    const orderValue = await this.orderValueRepository.bulkCreate(dto.orderValue.map((el) => ({
      count: el.count,
      productId: el.id,
      orderId: order.id,
    })));
    const array = dto.orderValue.flatMap((el, index) => el.selectedAttributes.map((el) => ({
      productAttrId: el.id,
      orderValueId: orderValue[index].id,
    })));
    const orderProductsAttrRepository = await this.orderProductsAttrRepository.bulkCreate(array);
    return { order, orderValue, orderProductsAttrRepository };
  }

  private async calculationOrderTotal(dto: CreateOrderDto) {
    const attributeValues = dto.orderValue.flatMap(({ selectedAttributes, count }) =>
      selectedAttributes.map(({ id }) => ({ id, count }))
    );
    const attributePrices = await Promise.all(attributeValues.map(({ id, count }) =>
      this.productService.getProductAttributesById(id)
        .then((prices) => ({ prices: prices.map((attribute) => attribute.price), count }))
    ));
    const attributeSum = attributePrices.map(({ prices, count }) =>
      prices.reduce((sum, price) => sum + price, 0) * count || 1
    ).reduce((sum, price) => sum + price, 0);
    const productValues = dto.orderValue.map(({ id, count }) => ({ id, count }));
    const productPrices = await Promise.all(productValues.map(({ id, count }) =>
      this.productService.getProductById(id).then((prices) => ({ prices: prices.map((product) => product.price), count }))
    ));
    const productSum = await Promise.all(productPrices.map(({ prices, count }) =>
      prices.reduce((sum, price) => sum + price, 0) * count
    ));
    const totalSum = productSum.reduce((sum, price) => sum + price, attributeSum);
    return Number(totalSum);
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


  async getAllOrders(user: Users) {
    const orders = await this.ordersRepository.findAll({ where: { userId: user.id }, order: [['createdAt', 'DESC']] });
    return orders;
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

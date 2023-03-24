import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UserAuth } from '../guard/get-auth.decorator';
import { Users } from '../users/users.model';

@Controller('order')
export class OrdersController {
  constructor(private orderService: OrdersService) {
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createOrder(@Body() dto: CreateOrderDto, @UserAuth() user: Users) {
    return this.orderService.createOrder(dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getOrder(@Param('id') id: number, @UserAuth() user: Users) {
    return this.orderService.getOrder(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/success/:orderId')
  successOrder(@Param('orderId') orderId: number) {
    return this.orderService.successOrder(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/cancel/:orderId')
  cancelOrder(@Param('orderId') orderId: number) {
    return this.orderService.cancelOrder(orderId);
  }


}

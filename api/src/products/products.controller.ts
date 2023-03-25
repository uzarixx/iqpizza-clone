import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductAttributesDto } from './dto/create-product-attributes.dto';

@Controller('product')
export class ProductsController {

  constructor(private productsService: ProductsService) {
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/create-attribute')
  createProductAttributes(@Body() dto: CreateProductAttributesDto) {
    return this.productsService.createProductAttributes(dto);
  }

  @Get('/all-attributes')
  getAllProductAttributes() {
    return this.productsService.getAllProductAttributes();
  }

  @Get('/all-products')
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

}

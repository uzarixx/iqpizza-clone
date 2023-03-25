import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './products.model';
import { ProductsAttributes } from './productsAttributes.model';
import { CreateProductAttributesDto } from './dto/create-product-attributes.dto';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Products) private productsRepository: typeof Products, @InjectModel(ProductsAttributes) private productsAttributes: typeof ProductsAttributes) {
  }

  async createProduct(dto: CreateProductDto) {
    return this.productsRepository.create(dto);
  }

  async getProductById(id: number | number[]) {
    return this.productsRepository.findAll({ where: { id } });
  }

  async getAllProductAttributes() {
    return this.productsAttributes.findAll();
  }

  async getProductAttributesById(id: number | number[] | string[]) {
    return this.productsAttributes.findAll({ where: { id } });
  }

  async createProductAttributes(dto: CreateProductAttributesDto) {
    return this.productsAttributes.create({ ...dto });
  }

  async getAllProducts() {
    return this.productsRepository.findAll();
  }


}

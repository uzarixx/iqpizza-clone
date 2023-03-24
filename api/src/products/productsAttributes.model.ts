import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { OrderValue } from '../orders/orderValue.model';
import { OrderProductsAttributes } from '../orders/orderProductAttributes.model';

interface ProductsAttributesCreateAttr {
  name: string;
  price: number;
}

@Table({ tableName: 'productsAttributes' })
export class ProductsAttributes extends Model<ProductsAttributes, ProductsAttributesCreateAttr> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING })
  name: string;
  @Column({ type: DataType.INTEGER })
  price: number;

  @BelongsToMany(() => OrderValue, () => OrderProductsAttributes)
  orderValue: OrderValue[];

}
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Orders } from './orders.model';
import { ProductsAttributes } from '../products/productsAttributes.model';
import { OrderProductsAttributes } from './orderProductAttributes.model';

interface OrderValueCreateAttr {
  orderId: number;
  productId: number;
  count: number;
}

@Table({ tableName: 'orderValue' })
export class OrderValue extends Model<OrderValue, OrderValueCreateAttr> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => Orders)
  @Column({ type: DataType.INTEGER, allowNull: false })
  orderId: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  count: number;
  @BelongsToMany(() => ProductsAttributes, () => OrderProductsAttributes)
  productsAttributes: ProductsAttributes[];

}
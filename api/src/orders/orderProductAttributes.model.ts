import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { OrderValue } from '../orders/orderValue.model';
import { ProductsAttributes } from '../products/productsAttributes.model';

interface IOrderProductsAttributes {
  productAttrId: number;
  orderValueId: number;
}

@Table({ tableName: 'orderProductsAttributes', timestamps: false })
export class OrderProductsAttributes extends Model<OrderProductsAttributes, IOrderProductsAttributes> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => ProductsAttributes)
  @Column({ type: DataType.INTEGER })
  productAttrId: string;
  @ForeignKey(() => OrderValue)
  @Column({ type: DataType.INTEGER })
  orderValueId: string;


}
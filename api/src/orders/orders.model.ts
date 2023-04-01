import { Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Users } from '../users/users.model';
import { OrderValue } from './orderValue.model';

interface OrdersCreateAttr {
  userId: number;
  orderPrice: number;
  city: string;
  address: string;
  isDelivery: boolean;
  status: string;
}

@Table({ tableName: 'orders' })
export class Orders extends Model<Orders, OrdersCreateAttr> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER })
  userId: number;
  @Column({ type: DataType.STRING })
  city: string;
  @Column({ type: DataType.STRING })
  address: string;
  @Column({ type: DataType.BOOLEAN })
  isDelivery: boolean;
  @Column({ type: DataType.STRING })
  status: string;
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  orderPrice: number;
  @Column({ type: DataType.INTEGER })
  userAmount: number;
  @Column({ type: DataType.TEXT })
  comment: string;
  @Column({ type: DataType.STRING })
  userName: string;
  @Column({ type: DataType.STRING })
  phoneNumber: string;

  @HasMany(() => OrderValue)
  orderValue: OrderValue;
}
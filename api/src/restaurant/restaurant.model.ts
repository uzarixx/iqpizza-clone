import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { City } from './city.model';

interface RestaurantCreationAttrs {
  city: string;
  cityId: number;
  streetName: string;
  streetNumber: string;
  openAt: number;
  closedAt: number;
}

@Table({ tableName: 'restaurant' })
export class Restaurant extends Model<Restaurant, RestaurantCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  city: string;
  @Column({ type: DataType.STRING, allowNull: false })
  streetName: string;
  @Column({ type: DataType.STRING, allowNull: false })
  streetNumber: string;
  @Column({ type: DataType.INTEGER, allowNull: false })
  openAt: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  closedAt: number;
  @ForeignKey(() => City)
  @Column({ type: DataType.INTEGER })
  cityId: number;
}
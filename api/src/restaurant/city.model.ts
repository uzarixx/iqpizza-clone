import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Restaurant } from './restaurant.model';

interface RestaurantCreationAttrs {
  city: string;
}

@Table({ tableName: 'city' })
export class City extends Model<City, RestaurantCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  city: string;
  @HasMany(() => Restaurant)
  restaurant: Restaurant[];
}
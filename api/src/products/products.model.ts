import { BelongsTo, BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Users } from '../users/users.model';
import { Favorites } from '../favorites/favorites.model';
import { OrderValue } from '../orders/orderValue.model';

interface ProductsCreateAttr {
  name: string;
  weight: number;
  isPizza: boolean;
  imageLink: string;
  price: number;
}

@Table({ tableName: 'products' })
export class Products extends Model<Products, ProductsCreateAttr> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, defaultValue: '' })
  name: string;
  @Column({ type: DataType.STRING, defaultValue: '' })
  description: string;
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  weight: number;
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  price: number;
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isPizza: boolean;
  @Column({ type: DataType.STRING, defaultValue: '' })
  imageLink: string;

  @BelongsToMany(() => Users, () => Favorites)
  users: Users[];
}
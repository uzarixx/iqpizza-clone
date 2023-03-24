import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Products } from '../products/products.model';
import { Users } from '../users/users.model';

interface FavoritesCreateAttr {
  productId: number;
  userId: number;
}

@Table({ tableName: 'favorites' })
export class Favorites extends Model<Favorites, FavoritesCreateAttr> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => Products)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;
}
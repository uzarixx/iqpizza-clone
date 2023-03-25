import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Products } from '../products/products.model';
import { Favorites } from '../favorites/favorites.model';
import { Orders } from '../orders/orders.model';
import { JwtTokens } from '../jwt-tokens/jwt-tokens.model';
import { Tokens } from '../tokens/tokens.model';

interface UserCreationAttrs {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  dateOfBirth: string;
  city: string;
  password: string;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, UserCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, unique: true })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phoneNumber: string;
  @Column({ type: DataType.DATE })
  dateOfBirth: string;
  @Column({ type: DataType.STRING, defaultValue: '' })
  city: string;
  @BelongsToMany(() => Products, () => Favorites)
  products: Products[];
  @HasMany(() => Orders)
  orders: Orders[];
  @HasMany(() => JwtTokens)
  jwtTokens: JwtTokens[];
  @HasMany(() => Tokens)
  tokens: Tokens[];
}
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Users } from '../users/users.model';

interface JwtTokensAttrs {
  userId: number;
  token: string;
  expiresAt: string | number;
}

@Table({ tableName: 'jwt-tokens' })
export class JwtTokens extends Model<JwtTokens, JwtTokensAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;
  @Column({ type: DataType.STRING, allowNull: false })
  token: string;
  @Column({ type: DataType.DATE, allowNull: false })
  expiresAt: string | number;
}
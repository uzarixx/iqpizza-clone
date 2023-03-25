import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Users } from '../users/users.model';


interface TokensCreationAttrs {
  userId: number;
  token: string;
}

@Table({ tableName: 'tokens' })
export class Tokens extends Model<Tokens, TokensCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;
  @Column({ type: DataType.STRING, allowNull: false })
  token: string;
}
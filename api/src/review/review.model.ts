import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ReviewPhoto } from './reviewPhoto.model';


interface ReviewCreationAttrs {
  name: string;
  phoneNumber: string;
  reviewText: string;
}

@Table({ tableName: 'review' })
export class Review extends Model<Review, ReviewCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  phoneNumber: string;
  @Column({ type: DataType.TEXT, allowNull: false })
  reviewText: string;
  @HasMany(() => ReviewPhoto)
  reviewPhoto: ReviewPhoto[];
}
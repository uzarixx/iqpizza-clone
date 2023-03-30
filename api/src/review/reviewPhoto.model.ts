import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Review } from './review.model';


interface ReviewPhotoCreationAttrs {
  reviewId: number;
  imageLink: string;
}

@Table({ tableName: 'review_photo' })
export class ReviewPhoto extends Model<ReviewPhoto, ReviewPhotoCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => Review)
  @Column({ type: DataType.INTEGER })
  reviewId: number;
  @Column({ type: DataType.STRING, unique: true })
  imageLink: string;
}
import { IsNumber } from 'class-validator';

export class UpdateFavoriteDto {
  @IsNumber({}, { message: 'Is not a number' })
  readonly productId: number;
}
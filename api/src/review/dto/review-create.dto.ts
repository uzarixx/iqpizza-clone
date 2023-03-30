import { IsString } from 'class-validator';

export class ReviewCreateDto {
  @IsString({ message: 'Is not a string' })
  readonly name: string;
  @IsString({ message: 'Is not a string' })
  readonly phoneNumber: string;
  @IsString({ message: 'Is not a string' })
  readonly reviewText: string;
}
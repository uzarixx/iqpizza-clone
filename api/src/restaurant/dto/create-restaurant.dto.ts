import { IsNumber, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString({ message: 'Is not a string' })
  readonly city: string;
  @IsString({ message: 'Is not a string' })
  readonly streetName: string;
  @IsString({ message: 'Is not a string' })
  readonly streetNumber: string;
  @IsNumber({}, { message: 'Is not a number' })
  readonly openAt: number;
  @IsNumber({}, { message: 'Is not a number' })
  readonly closedAt: number;
  @IsNumber({}, { message: 'Is not a number' })
  readonly cityId: number;
}
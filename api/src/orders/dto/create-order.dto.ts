import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString({ message: 'Is not a string' })
  readonly city: string;
  @IsString({ message: 'Is not a string' })
  readonly address: string;
  @IsString({ message: 'Is not a string' })
  readonly userName: string;
  @IsString({ message: 'Is not a string' })
  readonly comment: string;
  @IsNumber({}, { message: 'Is not a number' })
  readonly userAmount: number;
  @IsString({ message: 'Is not a string' })
  readonly phoneNumber: string;
  @IsBoolean({ message: 'Is not a boolean' })
  readonly isDelivery: boolean;
  @IsArray({ message: 'Is not a array' })
  readonly orderValue: [{ id: number, selectedAttributes: [{ id: number }], count: number }];
}
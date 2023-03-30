import { IsArray, IsBoolean, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString({ message: 'Is not a string' })
  readonly city: string;
  @IsString({ message: 'Is not a string' })
  readonly address: string;
  @IsBoolean({ message: 'Is not a boolean' })
  readonly isDelivery: boolean;
  @IsArray({ message: 'Is not a array' })
  readonly orderValue: [{ productId: number, productAttributes: [{ productAttrId: number}], count: number }];
}
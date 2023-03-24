import { IsArray, IsBoolean, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString({ message: 'Is not a string' })
  city: string;
  @IsString({ message: 'Is not a string' })
  address: string;
  @IsBoolean({ message: 'Is not a boolean' })
  isDelivery: boolean;
  @IsArray({ message: 'Is not a array' })
  orderValue: [{ productId: number, productAttributes: [{ productAttrId: number}], count: number }];
}
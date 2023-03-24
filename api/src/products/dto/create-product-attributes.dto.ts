import { IsNumber, IsString } from 'class-validator';

export class CreateProductAttributesDto {
  @IsString({ message: 'Is not a string' })
  name: string;
  @IsNumber({ allowInfinity: false }, { message: 'Is not a number' })
  price: number;
}
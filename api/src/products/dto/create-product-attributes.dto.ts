import { IsNumber, IsString } from 'class-validator';

export class CreateProductAttributesDto {
  @IsString({ message: 'Is not a string' })
  readonly name: string;
  @IsNumber({ allowInfinity: false }, { message: 'Is not a number' })
  readonly price: number;
}
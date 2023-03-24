import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Is not a string' })
  @Length(5, 40, { message: 'Length is not a valid' })
  name: string;
  @IsString({ message: 'Is not a string' })
  @Length(5, 300, { message: 'Length is not a valid' })
  description: string;
  @IsNumber({}, { message: 'Is not a number' })
  weight: number;
  @IsBoolean({ message: 'Is not a boolean' })
  isPizza: boolean;
  @IsString({ message: 'Is not a string' })
  @Length(5, 500, { message: 'Length is not a valid' })
  imageLink: string;
}
import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Is not a string' })
  @Length(5, 40, { message: 'Length is not a valid' })
  readonly name: string;
  @IsString({ message: 'Is not a string' })
  @Length(5, 300, { message: 'Length is not a valid' })
  readonly description: string;
  @IsNumber({}, { message: 'Is not a number' })
  readonly weight: number;
  @IsNumber({}, { message: 'Is not a number' })
  readonly price: number;
  @IsBoolean({ message: 'Is not a boolean' })
  readonly isPizza: boolean;
  @IsString({ message: 'Is not a string' })
  @Length(5, 500, { message: 'Length is not a valid' })
  readonly imageLink: string;
}
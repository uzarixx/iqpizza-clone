import { IsString } from 'class-validator';

export class CreateCityDto {
  @IsString({message: 'is not a string'})
  readonly city: string;
}
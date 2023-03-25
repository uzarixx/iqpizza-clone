import { IsDate, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Is not a string' })
  name: string;
  @IsString({ message: 'Is not a string' })
  city: string;
  @IsString({ message: 'Is not a string' })
  dateOfBirth: string;
}
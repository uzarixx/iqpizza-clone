import { IsString } from 'class-validator';

export class RegistrationDto {
  @IsString({ message: 'Is not a string' })
  email: string;
  @IsString({ message: 'Is not a string' })
  password: string;
  @IsString({ message: 'Is not a string' })
  name: string;
  @IsString({ message: 'Is not a string' })
  phoneNumber: string;
}
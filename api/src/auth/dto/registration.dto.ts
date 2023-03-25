import { IsEmail, IsString } from 'class-validator';

export class RegistrationDto {
  @IsEmail({}, { message: 'Is not a email' })
  @IsString({ message: 'Is not a string' })
  email: string;
  @IsString({ message: 'Is not a string' })
  password: string;
  @IsString({ message: 'Is not a string' })
  name: string;
  @IsString({ message: 'Is not a string' })
  phoneNumber: string;
}
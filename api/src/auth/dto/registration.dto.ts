import { IsEmail, IsString } from 'class-validator';

export class RegistrationDto {
  @IsEmail({}, { message: 'Is not a email' })
  @IsString({ message: 'Is not a string' })
  readonly email: string;
  @IsString({ message: 'Is not a string' })
  readonly password: string;
  @IsString({ message: 'Is not a string' })
  readonly name: string;
  @IsString({ message: 'Is not a string' })
  readonly phoneNumber: string;
}
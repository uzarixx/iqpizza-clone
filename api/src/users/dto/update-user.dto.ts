import { IsDate, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Is not a string' })
  readonly name: string;
  @IsString({ message: 'Is not a string' })
  readonly city: string;
  @IsString({ message: 'Is not a string' })
  readonly dateOfBirth: string;
}
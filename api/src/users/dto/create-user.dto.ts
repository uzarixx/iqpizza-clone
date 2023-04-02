export class CreateUserDto {

  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly city: string;
  readonly dateOfBirth?: string | number;
}
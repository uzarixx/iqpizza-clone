import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.model';

@Injectable()
export class UsersService {

  constructor(@InjectModel(Users) private usersRepository: typeof Users) {
  }


  async createUser(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }

  async getUserByEmail(email: string) {
    const user = this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async getUserById(id: number) {
    return this.usersRepository.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  }

}

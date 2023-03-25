import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.model';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(Users) private usersRepository: typeof Users) {
  }


  async createUser(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async updateUser(dto: UpdateUserDto, user: Users) {
    const candidate = await this.usersRepository.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password'] },
    });
    await candidate.update({ dateOfBirth: dto.dateOfBirth, name: dto.name, city: dto.city });
    await candidate.save();
    return candidate;
  }

  async getUserById(id: number) {
    return this.usersRepository.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  }

}

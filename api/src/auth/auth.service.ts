import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegistrationDto } from './dto/registration.dto';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import { Users } from '../users/users.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { JwtTokensService } from '../jwt-tokens/jwt-tokens.service';
import { phoneNumber } from '../utils/phoneNumber';


@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private jwtTokensService: JwtTokensService,
  ) {
  }

  async login(dto: LoginDto, response: Response) {
    const user = await this.validateUser(dto);
    const { token } = await this.generateRefreshToken(user);
    await this.jwtTokensService.createSession(token, user.id);
    response.cookie('jwt', token, { httpOnly: true });
    return this.generateAccessToken(user);
  }

  async registration(dto: RegistrationDto, response: Response) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('Такий користувач вже іcнує', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 7);
    const validPhoneNumber = phoneNumber(dto.phoneNumber);
    const user = await this.usersService.createUser({
      ...dto,
      city: dto.city,
      dateOfBirth: Date.now(),
      password: hashPassword,
      phoneNumber: validPhoneNumber,
    });
    const { token } = await this.generateRefreshToken(user);
    await this.jwtTokensService.createSession(token, user.id);
    response.cookie('jwt', token, { httpOnly: true });
    return this.generateAccessToken(user);
  }


  async refreshToken(token: string, response: Response) {
    try {
      const verifyToken = await this.jwtService.verify(token, { secret: process.env.PRIVATE_KEY });
      await this.jwtTokensService.findSession(token, response);
      const user = await this.usersService.getUserById(verifyToken.id);
      const resultToken = await this.generateAccessToken(user);
      return { resultToken: resultToken.token, user };
    } catch (e) {
      throw new HttpException('Token is not a valid', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(token: string) {
    try {
      await this.jwtTokensService.deleteSessionByToken(token);
      return 'success';
    } catch (e) {
      throw new HttpException('Token is not a valid', HttpStatus.UNAUTHORIZED);
    }
  }

  private async generateRefreshToken(users: Users) {
    return {
      token: this.jwtService.sign({ email: users.email, id: users.id }, {
        secret: process.env.PRIVATE_KEY,
        expiresIn: '60d',
      }),
    };
  }

  private async generateAccessToken(users: Users) {
    return {
      token: this.jwtService.sign({ email: users.email, id: users.id }, {
        secret: process.env.PRIVATE_KEY,
        expiresIn: '30m',
      }),
    };
  }

  private async validateUser(userDto: LoginDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException('Користувач не знайден');
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException('Пароль не дійсний');
  }

}

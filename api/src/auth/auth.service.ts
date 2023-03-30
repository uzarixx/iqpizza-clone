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


@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private jwtTokensService: JwtTokensService,
  ) {}

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
      throw new HttpException('User with this email already exists', HttpStatus.FORBIDDEN);
    }
    const hashPassword = await bcrypt.hash(dto.password, 7);
    const user = await this.usersService.createUser({ ...dto, password: hashPassword });
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
        expiresIn: '15m',
      }),
    };
  }

  private async validateUser(userDto: LoginDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException('Sorry, we can\'t find an account with this email address. ');
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException('Incorrect password.');
  }

}

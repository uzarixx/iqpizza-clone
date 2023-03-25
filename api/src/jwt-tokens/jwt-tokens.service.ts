import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { JwtTokens } from './jwt-tokens.model';
import { Response } from 'express';

@Injectable()
export class JwtTokensService {
  constructor(@InjectModel(JwtTokens) private jwtTokensRepository: typeof JwtTokens) {
  }

  async createSession(token: string, userId: number) {
    const date = Date.now() + 60 * 24 * 60 * 60 * 1000;
    return this.jwtTokensRepository.create({ token, userId, expiresAt: date });
  }

  async findSession(token: string, response: Response) {
    const session = await this.jwtTokensRepository.findOne({ where: { token, expiresAt: { [Op.gt]: Date.now() } } });
    if (!session) {
      response.clearCookie('jwt');
      throw new HttpException('Session or token is not a valid', HttpStatus.UNAUTHORIZED);
    }
    return session;
  }

  async deleteSessions() {
    const session = await this.jwtTokensRepository.destroy({ where: { expiresAt: { [Op.lt]: Date.now() } } });
  }
}

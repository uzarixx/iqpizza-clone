import { Module } from '@nestjs/common';
import { JwtTokensService } from './jwt-tokens.service';
import { JwtTokensController } from './jwt-tokens.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtTokens } from './jwt-tokens.model';

@Module({
  providers: [JwtTokensService],
  controllers: [JwtTokensController],
  imports: [SequelizeModule.forFeature([JwtTokens])],
  exports: [JwtTokensService],
})
export class JwtTokensModule {
}

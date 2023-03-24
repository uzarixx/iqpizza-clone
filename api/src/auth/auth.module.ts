import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtTokensModule } from '../jwt-tokens/jwt-tokens.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UsersModule, JwtModule.register({}), JwtTokensModule],
})
export class AuthModule {
}

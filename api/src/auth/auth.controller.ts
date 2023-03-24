import { Body, Controller, Post, Res, Req, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() dto: RegistrationDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.registration(dto, response);
  }

  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(dto, response);
  }


  @Post('/refresh')
  refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    return this.authService.refreshToken(request.cookies.jwt, response);
  }


}

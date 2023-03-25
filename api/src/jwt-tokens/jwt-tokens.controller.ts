import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JwtTokensService } from './jwt-tokens.service';

@Controller('jwt-tokens')
export  class JwtTokensController {

  constructor(private jwtTokensService: JwtTokensService) {
  }


  @Cron(CronExpression.EVERY_10_SECONDS)
  deleteSession() {
    return this.jwtTokensService.deleteSessions();
  }

}

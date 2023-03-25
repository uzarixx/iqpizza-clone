import { Body, Controller, Put, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UserAuth } from '../guard/get-auth.decorator';
import { Users } from './users.model';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('user')
export class UsersController {

  constructor(private userService: UsersService) {
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('/update-data')
  updateUser(@Body() dto: UpdateUserDto, @UserAuth() user: Users) {
    return this.userService.updateUser(dto, user);
  }


}

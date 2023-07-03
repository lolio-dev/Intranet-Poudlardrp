import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import {
  JwtAuthGuard,
  OptionnalJwtAuthGuard,
} from '../../auth/guards/jwt-aut.guard';
import { User } from '../../auth/decorators/user.decorator';
import { UserPatchDto } from './dto/userPatch.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('@me')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@User() user: UserEntity) {
    return user;
  }

  @Get('@me/token')
  @UseGuards(OptionnalJwtAuthGuard)
  getToken(@User() user: UserEntity) {
    if (user || process.env.email)
      return this.usersService.sign(user.email || process.env.email);
    throw new HttpException('UNAUTHORIZED', HttpStatus.FORBIDDEN);
  }

  @Patch('@me/patch')
  @UseGuards(JwtAuthGuard)
  patchUser(
    @Body() patcher: UserPatchDto,
    @User() user: UserEntity
  ) {
    return this.usersService.patch(user.id, patcher);
  }

  @Get()
  getUsers() {
    return this.usersService.find({});
  }
}

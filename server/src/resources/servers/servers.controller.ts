import {
  Body,
  Controller,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { SendMessageBodyDto } from './dto/sendMessageBody.dto';
import { ServersService } from './servers.service';
import { UserEntity } from '../users/entities/user.entity';
import { User } from '../../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-aut.guard';

@Controller('servers')
@UseGuards(JwtAuthGuard)
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Post(':id/sendMessage')
  sendMessage(
    @Param('id') id: string,
    @Body() content: SendMessageBodyDto,
    @User() user: UserEntity,
  ) {
    if (!user.uuid) return new HttpException('UUID must be defined', 400);
    return this.serversService.sendMessageToServer(id, user.uuid, content);
  }
}

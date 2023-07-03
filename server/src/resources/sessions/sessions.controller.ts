import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { FindAllPlayerSessionFromDateDto } from './dto/FindAllPlayerSessionFromDate';
import { JwtAuthGuard } from '../../auth/guards/jwt-aut.guard';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('/:playerUUID/')
  getAllSessionFromDayFromPlayer(
    @Param('playerUUID') playerUUID: string,
    @Body() body: FindAllPlayerSessionFromDateDto,
  ) {
    return this.sessionsService.findAllSessionFromDayFromPlayer(
      playerUUID,
      body.date,
    );
  }

  @Get(':playerId/firstSession')
  getFirstSession(@Param('playerId', ParseIntPipe) playerId: number) {
    return this.sessionsService.findFirstConnection(playerId);
  }
}

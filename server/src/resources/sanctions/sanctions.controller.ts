import { Controller, Get, Param } from '@nestjs/common';
import { SanctionsService } from './sanctions.service';
import { Body, Post, UseGuards } from '@nestjs/common/decorators';
import { User } from '../../auth/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { Timestamp } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guards/jwt-aut.guard';

@Controller('players/sanctions')
@UseGuards(JwtAuthGuard)
export class SanctionsController {
  constructor(private readonly sanctionsService: SanctionsService) {
  }

  @Get('/:playerUUID')
  getSanctions(
    @Param('playerUUID') playerUUID: string,
  ) {
    return this.sanctionsService.getAllSanctions(playerUUID);
  }

  @Post('kick/:uuid')
  kick(
    @Param() { uuid }: { uuid: string },
    @Body() content: { reason: string},
    @User() source: UserEntity,
  ) {
    this.sanctionsService.kick(uuid, content.reason, source.uuid)
  }

  @Post('mute/:uuid')
  mute(
    @Param() { uuid }: {uuid: string},
    @Body() content: { reason: string, duration: Timestamp},
    @User() source: UserEntity,
  ) {
    this.sanctionsService.mute(uuid, content.reason, content.duration, source.uuid)
  }

  @Post('ban/:uuid')
  ban(
    @Param() { uuid }: {uuid: string},
    @Body() content: { reason: string, duration: Timestamp},
    @User() source: UserEntity,
  ) {
    this.sanctionsService.ban(uuid, content.reason, content.duration, source.uuid)
  }

  @Post('bandef/:uuid')
  bandef(
    @Param() { uuid }: {uuid: string},
    @Body() content: { reason: string},
    @User() source: UserEntity,
  ) {
    this.sanctionsService.bandef(uuid, content.reason, source.uuid)
  }

  @Post('unban/:uuid')
  unban(
    @Param() { uuid }: {uuid: string},
    @Body() content: { reason: string},
    @User() source: UserEntity,
  ) {
    this.sanctionsService.unban(uuid, content.reason, source.uuid)
  }

  @Post('unmute/:uuid')
  unmute(
    @Param() { uuid }: {uuid: string},
    @Body() content: { reason: string},
    @User() source: UserEntity,
  ) {
    this.sanctionsService.unmute(uuid, content.reason, source.uuid)
  }
}

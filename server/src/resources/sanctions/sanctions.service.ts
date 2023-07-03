import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { PlayersService } from '../players/players.service';
import { SanctionsAdapter } from './sanctions.adapter';
import {
  BanCommand,
  BandefCommand,
  KickCommand,
  MuteCommand,
  UnbanCommand, UnmuteCommand
} from '../servers/providers/CommandProvider/commands';
import { RabbitService } from '../../rabbit/rabbit.service';

@Injectable()
export class SanctionsService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private readonly playersService: PlayersService,
    private readonly sanctionsAdapater: SanctionsAdapter,
    private readonly rabbitService: RabbitService
  ) {
  }

  async getAllSanctions(
    playerUUID: string
  ) {
    const sanctions = {
      bans: await this.knex('bans').where('target', playerUUID),
      kicks: await this.knex('kicks').where('target', playerUUID),
      mutes: await this.knex('mutes').where('target', playerUUID)
    };

    return this.sanctionsAdapater.sanctionsToFullSanctions(sanctions);
  }

  kick(uuid, reason, source) {
    new KickCommand()
      .execute(this.rabbitService, uuid, reason, source);
  }

  mute(uuid, reason, duration, source) {
    new MuteCommand()
      .execute(this.rabbitService, uuid, reason, duration, source);
  }

  ban(uuid, reason, duration, source) {
    new BanCommand()
      .execute(this.rabbitService, uuid, reason, duration, source);
  }

  bandef(uuid, reason, source) {
    new BandefCommand()
      .execute(this.rabbitService, uuid, reason, source);
  }

  unban(uuid, reason, source) {
    new UnbanCommand()
      .execute(this.rabbitService, uuid, reason, source);
  }

  unmute(uuid, reason, source) {
    new UnmuteCommand()
      .execute(this.rabbitService, uuid, reason, source);
  }
}

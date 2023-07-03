import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Session } from './types/Session';
import { isTimestampInADay } from '../../utils/time-converter/timeConverter';
import { PlayersService } from '../players/players.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SessionsService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private readonly playersService: PlayersService
  ) {}

  async getAllPlayerSessions(playerUUID: string) {
    const playerId = await lastValueFrom(this.playersService.getIdFromUUID(playerUUID));
    return this.knex('player_sessions').where({
      player_id: playerId,
    });
  }

  async findAllSessionFromDayFromPlayer(playerId: string, day) {
    const sessions = await this.getAllPlayerSessions(playerId);

    return sessions.filter(
      (session: Session) =>
        session &&
        isTimestampInADay(session.login, day),
    );
  }

  async findFirstConnection(playerId) {
    return this.knex('player_sessions')
      .where({
        player_id: playerId,
      })
      .first();
  }
}

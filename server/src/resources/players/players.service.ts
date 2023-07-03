import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { first, from, map, mergeMap, Observable, switchMap } from 'rxjs';

import { Player, PlayerInfo, UUID } from '@types';
import { QueryParametersDto } from './dto/queryParameters.dto';
import { InfoCommand, QuestCommand } from '../servers/providers/CommandProvider/commands';
import { RabbitService } from 'src/rabbit/rabbit.service';
import { ServersService } from '../servers/servers.service';
import { toPlayer } from './adapter/player.adapter';

@Injectable()
export class PlayersService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    @Inject(forwardRef(() => RabbitService))
    private readonly rabbitService: RabbitService,
    @Inject(forwardRef(() => ServersService))
    private readonly serversService: ServersService
  ) {
  }

  getAllPlayers() {
    return from(this.knex<Player>('player'));
  }

  getPlayerFromUUID(uuid: UUID): Observable<Player | undefined> {
    return from(this.knex<Player>('player').where({ uuid }))
      .pipe(first())
      .pipe(mergeMap(from));
  }

  getPlayerFromName(name: string) {
    return from(
      this.getPlayersJoinProperties()
        .where({ name })
        .first()
    );
  }

  async getCompletePlayerByUUID(uuid: string) {
    const data = await this.getPlayersJoinProperties().where({ uuid }).first()
    return toPlayer(data);
  }

  getPlayerInfo(uuid: UUID): Observable<PlayerInfo> {
    return this.getPlayerFromUUID(uuid).pipe(
      switchMap((p) =>
        this.getProperty(p.id, 'rank').pipe(
          map((rank) => ({ uuid: p.uuid, name: p.name, rank: rank.rank_id }))
        )
      )
    );
  }

  getProperty(
    playerId: number,
    propertyName: string
  ): Observable<any | undefined> {
    return from(this.knex<any>(`player_property_${propertyName}`))
      .pipe(map((values) => values.filter((v) => v.player_id === playerId)))
      .pipe(first())
      .pipe(mergeMap(from));
  }

  getUuidFromId(
    playerId: number
  ) {
    const query = from(this.knex<Player>('player').where('id', playerId).first().select('uuid'));
    return query.pipe(map(q => q.uuid));
  }

  getIdFromUUID(
    playerUUID: string
  ) {
    const query = from(this.knex<Player>('player').where('uuid', playerUUID).first().select('id'));
    return query.pipe(map(q => q.id))
  }

  searchPlayersByName(name: string, limit: QueryParametersDto['limit']) {
    return from(
      this.getPlayersJoinProperties()
        .where('name', 'like', `%${name}%`)
        .groupBy('player.id')
        .limit(limit)
    );
  }

  getPlayersJoinProperties() {
    return this.knex<Player>('player')
      .select('player.*')
      .select('player_property_discord.discord_id', 'player_property_discord.discord_tag')
      .select('player_property_rank.rank_id')
      .select('player_property_house.house_id')
      .select('player_property_blood.blood')
      .select('player_property_quest.quest_formats')
      .leftJoin('player_property_discord', 'player.id', 'player_property_discord.player_id')
      .leftJoin('player_property_rank', 'player.id', 'player_property_rank.player_id')
      .leftJoin('player_property_house', 'player.id', 'player_property_house.player_id')
      .leftJoin('player_property_blood', 'player.id', 'player_property_blood.player_id')
      .leftJoin('player_property_quest', 'player.id', 'player_property_quest.player_id');
  }

  info(uuid, source, server) {
    const command = new InfoCommand();
    return command.execute(this.rabbitService, uuid, server, source);
  }

  nextStep(uuid, source, server) {
    new QuestCommand()
      .executeNextstep(this.rabbitService, uuid, server, source);
  }

  reload(uuid, source, server) {
    new QuestCommand()
      .executeReload(this.rabbitService, uuid, server, source);
  }

  skip(uuid, source, server) {

    new QuestCommand()
      .executeSkip(this.rabbitService, uuid, server, source);
  }

  set(uuid, server, source, questId, serverId) {
    new QuestCommand()
      .executeSet(this.rabbitService, uuid, server, source, questId, serverId);
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { Body, Param, Post, UseGuards } from '@nestjs/common/decorators';
import { from, map } from 'rxjs';
import { User } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-aut.guard';
import { UserEntity } from '../users/entities/user.entity';
import { toPlayer } from './adapter/player.adapter';
import { QueryParametersDto } from './dto/queryParameters.dto';
import { SearchQueryDto } from './dto/searchQuery.dto';

import { PlayersService } from './players.service';
import { ServerTypes } from '@types';
import { Server } from '../servers/decorators/server.decorator';
import { PlayerMustBeConnected } from '../servers/decorators/server-check.decorator';
import { formatBlood } from '../../utils/minecraft/bloodsUtils';
import { formatHouse } from '../../utils/minecraft/houseUtils';

@Controller('players')
@UseGuards(JwtAuthGuard)
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService
  ) {
  }

  @Get(':uuid')
  async getPlayerByUUID(@Param('uuid') uuid: string) {
    return this.playersService.getCompletePlayerByUUID(uuid)
  }

  @Post('search')
  search(
    @Query() parameters: QueryParametersDto,
    @Body() search: SearchQueryDto
  ) {
    return this.playersService.searchPlayersByName(search.name, parameters.limit)
      .pipe(map(players => players.map(p => toPlayer(p))));
  }

  @Get('info/:uuid')
  @PlayerMustBeConnected(ServerTypes.MMO)
  async info(
    @Param() { uuid }: { uuid: string },
    @User() source: UserEntity,
    @Server() server: string
  ) {
    return from(this.playersService.info(uuid, source.uuid, server)).pipe(map(playerInfo => ({
      ...playerInfo,
      blood: formatBlood(playerInfo.blood),
      housse: formatHouse(playerInfo.housse)
    })));
  }

  @Get('quest/nextStep/:uuid')
  @PlayerMustBeConnected(ServerTypes.MMO)
  questNextStep(
    @Param() { uuid }: { uuid: string },
    @User() source: UserEntity,
    @Server() server: string
  ) {
    this.playersService.nextStep(uuid, source.uuid, server);
  }

  @Get('quest/reload/:uuid')
  @PlayerMustBeConnected(ServerTypes.MMO)
  questReload(
    @Param() { uuid }: { uuid: string },
    @User() source: UserEntity,
    @Server() server: string
  ) {
    this.playersService.reload(uuid, source.uuid, server);
  }

  @Get('quest/skip/:uuid')
  @PlayerMustBeConnected(ServerTypes.MMO)
  questSkip(
    @Param() { uuid }: { uuid: string },
    @User() source: UserEntity,
    @Server() server: string
  ) {
    this.playersService.skip(uuid, source.uuid, server);
  }

  @Post('quest/set/:uuid')
  @PlayerMustBeConnected(ServerTypes.MMO)
  questSet(
    @Param() { uuid }: { uuid: string },
    @Body() content: { server: string, questId: number, stepId: number },
    @User() source: UserEntity,
    @Server() server: string
  ) {
    this.playersService.set(uuid, server, source.uuid, content.questId, content.stepId);
  }
}

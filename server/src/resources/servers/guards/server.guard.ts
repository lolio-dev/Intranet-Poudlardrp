import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ServerTypes } from '@types';
import { ServersService } from '../servers.service';




@Injectable()
export class ServerGuard implements CanActivate {
  constructor(
    private readonly serversService: ServersService,
    private reflector: Reflector
  ) {
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const uuid = request.params.uuid;

    const serverTypes = this.reflector.get<ServerTypes[]>('serverTypes', context.getHandler());

    if (uuid) {
      const server = this.serversService.getPlayerServerAndCheckServerType(uuid, serverTypes);

      if (server) {
        request.server = server
        return true;
      }
        throw new InternalServerErrorException(`PLAYER_NOT_CONNECTED`)
    } else {
      throw new BadRequestException("UUID must be provided")
    }
  }
}
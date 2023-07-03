import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { ServersService } from './servers.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/serversws',
})
export class ServersGateway implements OnGatewayInit {
  @WebSocketServer()
  private server: Server;

  private logger = new Logger(ServersGateway.name)

  constructor(private readonly serversService: ServersService) {}

  afterInit(server: any): any {
    this.serversService.websocketServer = server;
  }

  @SubscribeMessage('uncaughtException')
  handleError(err) {
    return this.logger.error(err.stack);
  }

  @SubscribeMessage('getAllServers')
  getAllServers() {
    return Object.fromEntries(this.serversService.servers);
  }
}

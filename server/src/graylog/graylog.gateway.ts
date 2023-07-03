import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ListenToLogsDto } from './dto/listen-logs.dto';
import { GraylogService } from './graylog.service';
import { FullLogs } from '@types';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  path: '/instances/logs',
  cors: {
    origin: '*'
  }
})
export class GraylogGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  private intervals: Map<string, NodeJS.Timer> = new Map();
  private logger = new Logger(GraylogGateway.name);

  constructor(private readonly graylogService: GraylogService) {
  }

  @SubscribeMessage('uncaughtException')
  handleError(err) {
    return this.logger.error(err.stack);
  }

  handleDisconnect(client: any): any {
    this.cleanLogInterval(client.id);
  }

  private cleanLogInterval(clientId: string) {
    const interval = this.intervals.get(clientId);
    if (interval) clearInterval(interval);
  }

  @SubscribeMessage('listenToLogs')
  private async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() listenToLogsDto: ListenToLogsDto
  ): Promise<void> {
    await this.emitLogs(listenToLogsDto);
    this.intervals.set(
      client.id,
      setInterval(async () => {
        await this.emitLogs(listenToLogsDto);
      }, listenToLogsDto.interval)
    );
  }

  @SubscribeMessage('stopListeningToLogs')
  private stopListeningToLogs(
    @ConnectedSocket() client: Socket
  ) {
    this.cleanLogInterval(client.id);
  }

  private async emitLogs(listenToLogsDto: ListenToLogsDto) {
    const logs: FullLogs = await this.graylogService.getLogs({
      env: listenToLogsDto.env,
      instanceType: listenToLogsDto.instanceType,
      serverName: listenToLogsDto.serverName
    });

    this.server.emit('updateLogs', logs);
  }
}

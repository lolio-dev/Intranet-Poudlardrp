import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Server as WebsocketServer } from 'socket.io';
import { ChatItem, OnlinePlayer, Server } from '@types';

import { SendMessageBodyDto } from './dto/sendMessageBody.dto';
import { MessageProviderBuilder } from './providers/messageProvider.builder';
import { PlayersService } from '../players/players.service';
import { RabbitService } from '../../rabbit/rabbit.service';

@Injectable()
export class ServersService {
  public servers: Map<string, Server> = new Map();
  public websocketServer: WebsocketServer;

  constructor(
    @Inject(forwardRef(() => RabbitService))
    private readonly rabbitService: RabbitService,
    private readonly playerService: PlayersService
  ) {
  }

  updateServers(data) {
    const serverData: Server = data['server'];

    if (this.websocketServer && serverData) {
      const serverName = serverData.name;
      const existingServer = this.servers.get(serverName);

      if (existingServer) {
        this.servers.set(serverName, {
          ...serverData,
          chat: existingServer.chat
        });
      } else {
        serverData['chat'] = [];
        this.servers.set(serverName, serverData);
      }

      this.websocketServer.emit('updateServers', [serverName, this.servers.get(serverName)]);
    }
  }

  getPlayerServerAndCheckServerType(playerUUID: string, serverTypes: string[]) {
    let serverName: string;
    this.servers.forEach((server) => {
      if (serverTypes.includes(server.serverType)) {
        const data = JSON.parse(server.state.customData);
        const player = data.players.filter(player => player.uuid == playerUUID);
        if (player) {
          serverName = server.name;
        }
      }
    });

    return serverName;
  }

  getServerData(serverName: string) {
    return this.servers.get(serverName);
  }

  getPlayersFromServer(serverName: string): OnlinePlayer[] {
    const datas = this.getServerData(serverName);

    if (!datas) return [];

    const customData = JSON.parse(datas.state?.customData);

    if (!customData) return [];

    return customData.players;
  }

  updateChat(
    content: ChatItem
  ) {
    const server = this.servers.get(content.server);
    if (server) {
      if (!server.chat) {
        server.chat = [];
      }
      if (content.data) {
        content = {
          server: content.server,
          ...content.data
        };
      } else if (content.traductions) {
        content = {
          server: content.server,
          message: content.traductions[0].tradId,
          uuid: content.uuid,
          type: 'public'
        };
      }
      server.chat.push(content);
    }
  }

  removeServer(serverName: string) {
    this.servers.delete(serverName);
    this.websocketServer.emit('removeServer', serverName);
  }

  sendMessageToServer(
    server: string,
    uuid: string,
    content: SendMessageBodyDto
  ) {
    this.playerService.getPlayerInfo(uuid).subscribe((playerInfo) => {
      const providerBuilder = new MessageProviderBuilder(
        this.rabbitService,
        this.playerService,
        content.message
      );
      const provider = providerBuilder.getProvider();
      const uuids = this.getPlayersFromServer(server).map((p) => p.uuid);

      provider.send({ server, playerInfo, content, uuids });
    });
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Channel } from 'amqp-connection-manager';
import { connect, Connection } from 'amqplib';
import { ConfigService } from '@nestjs/config';


import { consumeResponse, storeRequest } from '../utils/request';
import { ServersService } from '../resources/servers/servers.service';
import { PacketContainer, Packet, Response, Request, ChatItem } from '@types';

@Injectable()
export class RabbitService {
  constructor(
    private readonly configService: ConfigService,
    private readonly serversService: ServersService,
  ) {
    this.connect();
  }

  private static EXCHANGE = 'pdrp';
  private connection: Connection | undefined;
  private channel: Channel | undefined;
  private readonly logger = new Logger(RabbitService.name);

  async connect() {
    this.logger.log('Initialise connection...');
    try {
      this.connection = await connect({
        hostname: this.configService.get('RABBIT_HOST'),
        port: this.configService.get('RABBIT_PORT'),
        username: this.configService.get('RABBIT_USERNAME'),
        password: this.configService.get('RABBIT_PASSWORD'),
      });
    } catch (e) {
      return this.logger.error('unable to connect to rabbitMq');
    }
    this.logger.log('Connected !');
    this.logger.log(`Using Exchange: ${RabbitService.EXCHANGE}`);
    this.channel = await this.connection.createChannel();
    const assertQueue = await this.channel.assertQueue('', { exclusive: true });
    this.logger.debug(`Using queue: ${assertQueue.queue}`);

    await this.channel.assertExchange(RabbitService.EXCHANGE, 'topic');
    await this.channel.bindQueue(
      assertQueue.queue,
      RabbitService.EXCHANGE,
      'pdrp',
    );
    await this.channel.bindQueue(
      assertQueue.queue,
      RabbitService.EXCHANGE,
      'pdrp.web.intranet',
    );

    const consume = await this.channel.consume(assertQueue.queue, (msg) => {
      const packet: PacketContainer = JSON.parse(
        <string>msg?.content.toString(),
      );
      const content: Packet = JSON.parse(packet.content);
      switch (packet.packetClass) {
        case 'fr.poudlardrp.api.player.chat.ChatToIntranetPacket':
          this.serversService.updateChat(content as ChatItem);
          break;
        case 'fr.poudlardrp.api.packet.server.ServerUpdatePacket':
          this.serversService.updateServers(content);
          break;
        case 'fr.poudlardrp.api.packet.sandwich.player.tchat.SendMessageToPlayerPacket':
          this.serversService.updateChat(content as ChatItem);
          break;
        case 'fr.poudlardrp.api.packet.sandwich.server.StopServerPacket':
          this.serversService.removeServer(content['serverRaw']['name'])
          break;
      }
      if ((content as Response).uuid_request) {
        consumeResponse(content);
      } else {
      }
    });
    this.logger.debug(`Consumer tag: ${consume.consumerTag}`);
  }

  public sendPacket(recipient: Recipient, packet: Packet, packetClass: string) {
    this.logger.log('publishing message to ' + recipient.routingKey);

    const packetContainer: PacketContainer = {
      packetClass,
      content: JSON.stringify(packet),
    };

    const rawPacket = JSON.stringify(packetContainer);

    this.logger.debug(rawPacket);

    this.channel?.publish(
      RabbitService.EXCHANGE,
      recipient.routingKey,
      Buffer.from(rawPacket),
      { appId: 'pdrp.web.intranet' },
    );
  }

  public sendRequest(
    recipient: Recipient,
    request: Request,
    packetClass: string,
  ) {
    const futurReq = storeRequest(request);
    this.sendPacket(recipient, request, packetClass);
    return futurReq;
  }
}

export class FutureRequest {
  public responseCallback: ((response: Response) => void) | undefined;
  public timeoutCallback: (() => void) | undefined;

  public onResponse(callback: (response: Response) => void) {
    this.responseCallback = callback;
  }

  public onTimeout(callback: () => void) {
    this.timeoutCallback = callback;
  }
}

export class Recipient {
  public routingKey: string;

  public static base = 'pdrp';
  public static minecraft = 'mc';

  public static BASE = new Recipient(Recipient.base);
  public static MINECRAFT = new Recipient(Recipient.base, Recipient.minecraft);
  public static LOBBY = new Recipient(
    Recipient.base,
    Recipient.minecraft,
    'lobby',
  );
  public static MMO = new Recipient(Recipient.base, Recipient.minecraft, 'mmo');
  public static BUILD = new Recipient(
    Recipient.base,
    Recipient.minecraft,
    'build',
  );
  public static BUNGEE = new Recipient(Recipient.base, 'bungee');
  public static SANDWICH = new Recipient(Recipient.base, 'sandwich');
  public static DISCORD = new Recipient(Recipient.base, 'discord');
  public static WEBAPI = new Recipient(Recipient.base, 'web', 'api');

  constructor(...routingKeys: string[]) {
    this.routingKey = routingKeys.join('.');
  }
}

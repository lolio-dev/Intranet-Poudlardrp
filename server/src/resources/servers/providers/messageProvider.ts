import { RabbitService } from '../../../rabbit/rabbit.service';
import { PlayersService } from '../../../resources/players/players.service';

export abstract class MessageProvider<T> {
  abstract packetName: string;
  rabbitService: RabbitService;
  playerService: PlayersService;

  constructor(rabbitService: RabbitService, playerService: PlayersService) {
    this.rabbitService = rabbitService;
    this.playerService = playerService;
  }

  abstract buildMessage(
    message: string,
    name?: string,
    rankName?: string,
    rankColor?: string,
  );

  abstract send(params: T);
}

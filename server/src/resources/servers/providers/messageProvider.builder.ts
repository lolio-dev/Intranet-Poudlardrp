import { CommandProvider } from './CommandProvider/commandProvider';
import { DefaultProvider } from './DefaultProvider/defaultProvider';
import { GSProvider } from './GsProvider/gsProvider';
import { RabbitService } from '../../../rabbit/rabbit.service';
import { PlayersService } from '../../../resources/players/players.service';

export class MessageProviderBuilder {
  rabbit: RabbitService;
  player: PlayersService;
  message: string;

  constructor(rabbit: RabbitService, player: PlayersService, message: string) {
    this.rabbit = rabbit;
    this.player = player;
    this.message = message;
  }

  getProvider() {
    if (this.message.startsWith('/')) {
      return new CommandProvider(this.rabbit, this.player);
    } else if (this.message.startsWith('!')) {
      return new GSProvider(this.rabbit, this.player);
    }
    return new DefaultProvider(this.rabbit, this.player);
  }
}

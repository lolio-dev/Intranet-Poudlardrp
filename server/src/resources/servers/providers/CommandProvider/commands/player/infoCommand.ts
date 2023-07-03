import { Command, ArgumentType } from '@types';
import { SendCommandPacket } from 'src/rabbit/packets/SendCommandPacket';
import { Recipient } from 'src/rabbit/rabbit.service';

export class InfoCommand extends Command {
  name = 'info';
  completion = [
    {
      name: 'player',
      type: ArgumentType.player,
      placeholder: 'player',
      validator: /^[a-zA-Z0-9_]{2,16}$/gm
    }
  ];

  execute = async (rabbit, player, server, source): Promise<Record<any, any>> => {
    const sendCommandPacket = new SendCommandPacket(this.name, server, source, { player } as any);
    return new Promise((resolve) => {
      rabbit.sendRequest(
        Recipient.BASE,
        sendCommandPacket,
        'fr.poudlardrp.api.core.command.intranet.IntranetCommandExecutionRequest'
      ).onResponse((data) => {
        if (data.data) {
          resolve(data.data)
        }
      });
    });
  };
}

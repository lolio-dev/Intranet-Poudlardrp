import { Command, ArgumentType } from '@types';
import { SendCommandPacket } from 'src/rabbit/packets/SendCommandPacket';
import { Recipient } from 'src/rabbit/rabbit.service';

export class KickCommand extends Command {
  name = 'kick';
  forcedServer = 'MASTER-0';
  completion = [
    {
      name: 'player',
      type: ArgumentType.player,
      placeholder: 'player',
      validator: /^[a-zA-Z0-9_]{2,16}$/gm,
      next: [
        {
          name: 'reason',
          type: ArgumentType.string,
          placeholder: 'reason',
          validator: /./,
        },
      ],
    },
  ];

  execute = (rabbit, player, reason, source) => {
    const sendCommandPacket = new SendCommandPacket(this.name, this.forcedServer, source, {
      reason,
      player,
    } as any);

    rabbit.sendPacket(
      Recipient.BASE,
      sendCommandPacket,
      'fr.poudlardrp.api.core.command.intranet.IntranetCommandExecutionRequest',
    );
  }
}

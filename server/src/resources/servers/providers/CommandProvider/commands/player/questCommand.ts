import { Command, ArgumentType } from '@types';
import { SendCommandPacket } from 'src/rabbit/packets/SendCommandPacket';
import { Recipient } from 'src/rabbit/rabbit.service';

export class QuestCommand extends Command {
  name = 'quest';
  completion = [
    {
      name: 'player',
      type: ArgumentType.player,
      placeholder: 'player',
      validator: /^[a-zA-Z0-9_]{2,16}$/gm,
      next: [
        {
          name: 'subCommand',
          type: ArgumentType.string,
          placeholder: 'nextstep',
          validator: /nextstep/,
        },
        {
          name: 'subCommand',
          type: ArgumentType.string,
          placeholder: 'reload',
          validator: /reload/,
        },
        {
          name: 'subCommand',
          type: ArgumentType.string,
          placeholder: 'skip',
          validator: /skip/,
        },
        {
          name: 'subCommand',
          type: ArgumentType.string,
          placeholder: 'set',
          validator: /set/,
          next: [
            {
              name: 'questId',
              type: ArgumentType.number,
              placeholder: 'questId',
              validator: /[0-9]{8}/,
              next: [
                {
                  name: 'stepId',
                  type: ArgumentType.number,
                  placeholder: 'stepId',
                  validator: /[0-9]+/,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  execute = (rabbit, packet: SendCommandPacket) => {
    rabbit.sendPacket(Recipient.BASE, packet, 'fr.poudlardrp.api.core.command.intranet.IntranetCommandExecutionRequest');
  }

  executeNextstep = (rabbit, player, server, source) => {
    const packet = new SendCommandPacket(this.name, server, source, { player, subCommand: 'nextstep' } as any);
    this.execute(rabbit, packet)
  }

  executeReload = (rabbit, player, server, source) => {
    const packet = new SendCommandPacket(this.name, server, source, { player, subCommand: 'reload' } as any);
    this.execute(rabbit, packet)
  }

  executeSkip = (rabbit, player, server, source) => {
    const packet = new SendCommandPacket(this.name, server, source, { player, subCommand: 'skip' } as any);
    this.execute(rabbit, packet)
  }

  executeSet = (rabbit, player, server, source, questId, stepId) => {
    const packet = new SendCommandPacket(this.name, server, source, { player, subCommand: 'set', questId, stepId } as any);
    this.execute(rabbit, packet)
  }
}

import { Command, ArgumentType } from '@types';

export class LookupCommand extends Command {
  name = 'lookup';
  forcedServer = 'MASTER-0';
  completion = [
    {
      name: 'player',
      type: ArgumentType.player,
      placeholder: 'player',
      validator: /^[a-zA-Z0-9_]{2,16}$/gm,
    },
  ];
}

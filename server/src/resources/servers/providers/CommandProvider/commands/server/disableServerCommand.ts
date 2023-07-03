import { Command, ArgumentType } from '@types';

export class DisableServerCommand extends Command {
  name = 'serverdisable';
  forcedServer = 'MASTER-0';
  completion = [
    {
      name: 'server',
      type: ArgumentType.string,
      placeholder: 'server',
      validator: /./,
    },
  ];
}

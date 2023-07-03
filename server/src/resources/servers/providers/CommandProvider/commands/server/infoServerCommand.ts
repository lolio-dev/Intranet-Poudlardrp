import { Command, ArgumentType } from '@types';

export class InfoServerCommand extends Command {
  name = 'serverinfo';
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

import { Command, ArgumentType } from '@types';

export class EnableServerCommand extends Command {
  name = 'serverenable';
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

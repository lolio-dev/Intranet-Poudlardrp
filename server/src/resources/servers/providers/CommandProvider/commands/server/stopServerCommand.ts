import { Command, ArgumentType } from '@types';

export class StopServerCommand extends Command {
  name = 'serverstop';
  forcedServer = 'MASTER-0';
  completion = [
    {
      name: 'server',
      type: ArgumentType.string,
      placeholder: 'server',
      validator: /./,
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
}

import { Command, ArgumentType } from '@types';

export class StartServerCommand extends Command {
  //serverstart true dev dev null  DEV DEV
  name = 'serverstart';
  forcedServer = 'MASTER-0';
  completion = [
    {
      name: 'isDev',
      type: ArgumentType.boolean,
      placeholder: 'isDev',
      validator: /([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])/,
      next: [
        {
          name: 'branch',
          type: ArgumentType.string,
          placeholder: 'branch',
          validator: /./,
          next: [
            {
              name: 'quest',
              type: ArgumentType.string,
              placeholder: 'quest',
              validator: /./,
              next: [
                {
                  name: 'slave',
                  type: ArgumentType.string,
                  placeholder: 'slave',
                  validator: /./,
                  next: [
                    {
                      name: 'serverCapacity',
                      type: ArgumentType.string,
                      placeholder: 'serverCapacity',
                      validator: /./,
                      next: [
                        {
                          name: 'serverAttributes',
                          type: ArgumentType.string,
                          placeholder: 'serverAttributes',
                          validator: /./,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}

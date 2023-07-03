import { first, from, map, mergeMap, of, zip } from 'rxjs';

import { MessageProvider } from '../messageProvider';
import { SendMessageBodyDto } from '../../dto/sendMessageBody.dto';
import { Argument, ArgumentType, Command, PlayerInfo } from '@types';
import { Recipient } from '../../../../rabbit/rabbit.service';
import { SendCommandPacket } from '../../../../rabbit/packets/SendCommandPacket';
import * as Commands from './commands';

interface Params {
  server: string;
  playerInfo: PlayerInfo;
  content: SendMessageBodyDto;
  uuids: string[];
}

export class CommandProvider extends MessageProvider<Params> {
  packetName =
    'fr.poudlardrp.api.core.command.intranet.IntranetCommandExecutionRequest';
  commandList = [
    new Commands.InfoCommand(),
    new Commands.QuestCommand(),
    new Commands.KickCommand(),
    new Commands.BanCommand(),
    new Commands.BandefCommand(),
    new Commands.UnbanCommand(),
    new Commands.MuteCommand(),
    new Commands.UnmuteCommand(),
    new Commands.StartServerCommand(),
    new Commands.RestartServerCommand(),
    new Commands.StopServerCommand(),
    new Commands.ListServerCommand(),
    new Commands.InfoServerCommand(),
    new Commands.EnableServerCommand(),
    new Commands.DisableServerCommand(),
    new Commands.LookupCommand(),
  ];

  buildMessage(message: string) {
    return message.substring(1).split(' ');
  }

  send(params: Params) {
    const { server, playerInfo, content } = params;
    const stringArgs = this.buildMessage(content.message);
    const command = this.commandList.find((c) => c.name === stringArgs[0]);

    if (!command) return;

    this.toRabbitArgs(stringArgs.slice(1), command).subscribe((args) => {
      const sendCommandPacket = new SendCommandPacket(
        command.name,
        command.forcedServer || server,
        playerInfo.uuid,
        args,
      );
      this.rabbitService.sendPacket(
        Recipient.BASE,
        sendCommandPacket,
        this.packetName,
      );
    });
  }

  toRabbitArgs(args: string[], command: Command) {
    if (command.completion.length === 0) {
      return of({});
    }

    return zip(command.completion.map((c) => this.validate(0, {}, args, c)))
      .pipe(first())
      .pipe(mergeMap(from));
  }

  parseToObservable(type: ArgumentType, arg: string) {
    switch (type) {
      case ArgumentType.player:
        return this.playerService.getPlayerFromName(arg);
      case ArgumentType.number:
        return of(parseInt(arg));
      case ArgumentType.boolean:
        return of(!!arg);
      default:
        return of(arg);
    }
  }

  validate(
    index: number,
    value: { [key: string]: string },
    args: string[],
    commandArg: Argument,
  ) {
    const currentArg = this.parseToObservable(commandArg.type, args[index]);

    return currentArg.pipe(
      map((argValue: any) => {
        if (commandArg.validator.test(args[index])) {
          let content =
            argValue.uuid || (argValue === 'null' ? undefined : argValue);

          if (commandArg.next) {
            commandArg.next.forEach((n) => {
              this.validate(index + 1, value, args, n).subscribe();
            });
          } else if (args.length >= index) {
            content = args.slice(index).join(' ');
          }

          Object.assign(value, { [commandArg.name]: content });
        }
        return value;
      }),
    );
  }
}

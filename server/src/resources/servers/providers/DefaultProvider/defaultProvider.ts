import { capitalize } from 'lodash';

import { MessageProvider } from '../messageProvider';
import { SendMessageBodyDto } from '../../dto/sendMessageBody.dto';
import { SendMessagePacket } from '../../../../rabbit/packets/sendMessagePacket';
import { Recipient } from '../../../../rabbit/rabbit.service';
import { MinecraftRanks, PlayerInfo } from '@types';

interface Params {
  playerInfo: PlayerInfo;
  content: SendMessageBodyDto;
  uuids: string[];
  server: string;
}

export class DefaultProvider extends MessageProvider<Params> {
  packetName =
    'fr.poudlardrp.api.packet.sandwich.player.tchat.SendMessageToPlayerPacket';

  buildMessage(
    message: string,
    name: string,
    rankName: string,
  ) {
    const prefix = '§8(Hors-Ligne)';
    return `${prefix} §6${capitalize(
      rankName,
    )} ${name} §7:§f ${message}`;
  }

  send(params: Params) {
    const { playerInfo, content, uuids, server } = params;
    const rankName = MinecraftRanks[playerInfo.rank];
    const traductions = [
      {
        categories: null,
        tradId: this.buildMessage(
          content.message,
          playerInfo.name,
          rankName,
        ),
        arguments: [],
      },
    ];
    const messagePacket = new SendMessagePacket(
      content.type,
      false,
      traductions,
      uuids,
      playerInfo.uuid,
      server,
    );
    this.rabbitService.sendPacket(
      Recipient.BASE,
      messagePacket,
      this.packetName,
    );
  }
}

import { capitalize } from 'lodash';
import { ColorRank, PlayerInfo, MinecraftRanks } from '@types';

import { MessageProvider } from '../messageProvider';
import { SendMessageBodyDto } from '../../dto/sendMessageBody.dto';
import { GlobalStaffPacket } from '../../../../rabbit/packets/GlobalStaffPacket';
import { Recipient } from '../../../../rabbit/rabbit.service';

interface Params {
  playerInfo: PlayerInfo;
  content: SendMessageBodyDto;
}

export class GSProvider extends MessageProvider<Params> {
  packetName =
    'fr.poudlardrp.api.packet.sandwich.player.tchat.GlobalStaffPacket';

  buildMessage(
    message: string,
    name: string,
    rankName: string,
    rankColor: string,
  ) {
    const prefix = '§b[GS]';
    return `${prefix} ${rankColor}${capitalize(
      rankName,
    )} ${name} §8➠§f ${message.substring(1)}`;
  }

  send(params: Params) {
    const { playerInfo, content } = params;
    const rankName = MinecraftRanks[playerInfo.rank];
    const rankColor = ColorRank[rankName];
    const message = this.buildMessage(
      content.message,
      playerInfo.name,
      rankName,
      rankColor,
    );
    const messagePacket = new GlobalStaffPacket(message);
    this.rabbitService.sendPacket(
      Recipient.BASE,
      messagePacket,
      this.packetName,
    );
  }
}

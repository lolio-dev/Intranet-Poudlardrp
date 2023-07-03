import { Packet } from '@types';

export class SendMessagePacket implements Packet {
  constructor(
    private typeMessage: string,
    private broadcase: boolean,
    private traductions: any,
    private uuids: string[],
    private uuid: string,
    private server: string,
  ) {}
}

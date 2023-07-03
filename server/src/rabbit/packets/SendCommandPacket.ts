import { Argument, Packet, UUID } from '@types';

export class SendCommandPacket implements Packet {
  constructor(
    private commandName: string,
    private server: string,
    private source: UUID,
    private args: Argument,
  ) {}
}

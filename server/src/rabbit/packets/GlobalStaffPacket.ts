import { Packet } from '@types';

export class GlobalStaffPacket implements Packet {
  constructor(private message: string) {}
}

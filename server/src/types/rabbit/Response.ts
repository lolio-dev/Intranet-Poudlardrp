import { Packet } from './Packet';

export interface Response extends Packet {
  started?: boolean;
  uuid_request?: string;
}

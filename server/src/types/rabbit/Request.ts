import { Packet } from './Packet';

export interface Request extends Packet {
  started?: boolean;
  uuid_request?: string;
}

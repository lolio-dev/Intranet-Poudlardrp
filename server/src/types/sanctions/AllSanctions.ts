import { Mute } from './Mute';
import { Kick } from './Kick';
import { Ban } from './Ban';

export interface AllSanctions {
  mutes: Mute[];
  kicks: Kick[];
  bans: Ban[];
}

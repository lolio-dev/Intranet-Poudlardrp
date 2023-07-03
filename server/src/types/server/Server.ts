import { ServerTypes } from '@types';
import { ChatItem } from './ChatItem';

export interface Server {
  id: number;
  serverType: ServerTypes;
  name: string;
  port: number;
  ip: string;
  version: string;
  chat: ChatItem[];
  state: Record<any, any>;
}

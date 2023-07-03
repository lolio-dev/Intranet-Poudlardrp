import { Environments } from '../enums/environments';
import { Log } from './Log';

export interface FullLogs {
  source: string;
  env: Environments;
  logs: Log[];
}

import { Argument } from './argument';

export abstract class Command {
  forcedServer?: string;
  abstract name: string;
  abstract completion: Argument[];
}

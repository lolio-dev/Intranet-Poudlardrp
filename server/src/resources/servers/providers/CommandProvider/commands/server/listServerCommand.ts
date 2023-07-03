import { Command } from '@types';

export class ListServerCommand extends Command {
  name = 'servers';
  forcedServer = 'MASTER-0';
  completion = [];
}

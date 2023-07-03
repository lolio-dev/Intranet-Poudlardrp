import { Controller, Get, Param } from '@nestjs/common';
import { PathfinderService } from './pathfinder.service';

@Controller('pathfinder')
export class PathfinderController {
  constructor(private readonly pathfinderService: PathfinderService) {
  }

  @Get('/errors')
  getKeys() {
    return this.pathfinderService.getKeys();
  }

  @Get('/:namespace/:key')
  getKey(
    @Param('namespace') namespace: string,
    @Param('key') key: string
  ) {
    return this.pathfinderService.getData(key, namespace)
  }
}

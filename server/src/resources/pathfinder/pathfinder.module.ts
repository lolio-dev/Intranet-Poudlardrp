import { Module } from '@nestjs/common';
import { PathfinderService } from './pathfinder.service';
import { PathfinderController } from './pathfinder.controller';

@Module({
  controllers: [PathfinderController],
  providers: [PathfinderService]
})
export class PathfinderModule {
}

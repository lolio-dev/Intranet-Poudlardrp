import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { PlayersModule } from '../players/players.module';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService],
  imports: [PlayersModule],
})
export class SessionsModule {}

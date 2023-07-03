import { forwardRef, Module } from '@nestjs/common';
import { RabbitModule } from 'src/rabbit/rabbit.module';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { ServersModule } from '../servers/servers.module';

@Module({
  imports: [forwardRef(() => RabbitModule), forwardRef(() => ServersModule)],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}

import { forwardRef, Module } from '@nestjs/common';

import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import { ServersGateway } from './servers.gateway';
import { PlayersModule } from '../players/players.module';
import { RabbitModule } from '../../rabbit/rabbit.module';

@Module({
  imports: [forwardRef(() => RabbitModule), forwardRef(() => PlayersModule)],
  controllers: [ServersController],
  providers: [ServersGateway, ServersService],
  exports: [ServersService],
})
export class ServersModule {}

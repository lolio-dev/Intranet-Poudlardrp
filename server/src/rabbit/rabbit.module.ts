import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RabbitService } from './rabbit.service';
import { ServersModule } from '../resources/servers/servers.module';

@Module({
  imports: [ConfigModule, ServersModule],
  providers: [RabbitService],
  exports: [RabbitService],
})
export class RabbitModule {}

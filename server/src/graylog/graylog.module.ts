import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GraylogService } from './graylog.service';
import { GraylogGateway } from './graylog.gateway';
import { GraylogAdapter } from './adapter/graylog.adapter';

@Module({
  imports: [ConfigModule],
  providers: [GraylogService, GraylogGateway, GraylogAdapter],
})
export class GraylogModule {}

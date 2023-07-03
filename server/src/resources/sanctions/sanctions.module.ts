import { forwardRef, Module } from '@nestjs/common';
import { SanctionsService } from './sanctions.service';
import { SanctionsController } from './sanctions.controller';
import { PlayersModule } from '../players/players.module';
import { MojangModule } from '../../mojang/mojang.module';
import { SanctionsAdapter } from './sanctions.adapter';
import { RabbitModule } from '../../rabbit/rabbit.module';

@Module({
  controllers: [SanctionsController],
  providers: [SanctionsService, SanctionsAdapter],
  exports: [SanctionsService],
  imports: [forwardRef(() => PlayersModule), MojangModule, RabbitModule]
})
export class SanctionsModule {}

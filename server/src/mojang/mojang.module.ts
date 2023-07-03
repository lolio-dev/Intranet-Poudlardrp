import { Module } from '@nestjs/common';

import { MojangService } from './mojang.service';
import { MojangController } from './mojang.controller';

@Module({
  imports: [],
  controllers: [MojangController],
  providers: [MojangService],
  exports: [MojangService],
})
export class MojangModule {}

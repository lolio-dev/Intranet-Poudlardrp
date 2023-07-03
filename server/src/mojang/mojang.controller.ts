import { Controller, Get, Param } from '@nestjs/common';

import { MojangService } from './mojang.service';

@Controller('mojang')
export class MojangController {
  constructor(private readonly mojangService: MojangService) {}

  @Get('decodeUsername/:username')
  decodeUsername(@Param('username') username: string) {
    return this.mojangService.decodeUsername(username);
  }

  @Get('decodeUUID/:uuid')
  decodeUUID(@Param('uuid') uuid: string) {
    return this.mojangService.decodeUUID(uuid);
  }
}

import { applyDecorators, SetMetadata } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ServerGuard } from '../guards/server.guard';
import { ServerTypes } from '@types';

export const PlayerMustBeConnected = (...serverTypes: ServerTypes[]) => {
  return applyDecorators(
    SetMetadata('serverTypes', serverTypes),
    UseGuards(ServerGuard)
  );
}

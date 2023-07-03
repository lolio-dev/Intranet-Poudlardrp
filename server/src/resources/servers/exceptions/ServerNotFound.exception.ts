import { NotFoundException } from '@nestjs/common';

export class ServerNotFoundException extends NotFoundException {
  constructor(serverId: string) {
    super(`Server (name: ${serverId} not found`);
  }
}

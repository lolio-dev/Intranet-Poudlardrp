import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth(): Record<string, any> {
    return {
      online: true,
      message: 'Api intranet poudlardRp'
    };
  }
}

import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class PathfinderService {
  constructor(
    private readonly redisService: RedisService
  ) {}

  async getData(key: string, namespace: string): Promise<any> {
    const client = this.redisService.getClient(namespace);
    return client.get(key);
  }

  async getKeys(): Promise<{ prod: string[], dev: string[] }> {
    const devClient = this.redisService.getClient('dev');
    const prodClient = this.redisService.getClient('prod');
    const prefix = 'A*:Fail*';

    const devKeys = await devClient.keys(prefix);
    const prodKeys = await prodClient.keys(prefix);

    return {
      dev: devKeys,
      prod: prodKeys
    }
  }
}

import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';

import { GraylogAdapter } from './adapter/graylog.adapter';
import { Log, FullLogs, Environments, InstanceTypes } from '@types';

type GraylogQuery = {
  env: Environments;
  serverName: string;
  instanceType: InstanceTypes;
}

@Injectable()
export class GraylogService {
  constructor(
    private readonly graylogAdapter: GraylogAdapter,
    private readonly configService: ConfigService,
  ) {}

  async getLogs(config: GraylogQuery): Promise<FullLogs> {
    const { env, serverName } = config;
    const query = `?limit=50&query=environment:${env}&&(source:${serverName})&range=999999&sort=timestamp:desc`;
    const url =
      'https://logs.poudlardrp.fr/api/search/universal/relative' + query;
    let req: AxiosResponse;
    const logs: Log[] = [];
    try {
      req = await axios.get(url, {
        withCredentials: true,
        auth: {
          username: this.configService.get('LDAP_USERNAME'),
          password: this.configService.get('LDAP_PASSWORD'),
        },
      });
    } catch (e) {
      throw new WsException("Can't get logs");
    }

    const messages = req.data['messages'];

    messages.forEach((log) => {
      logs.push({
        message: log['message']['message'],
        time: log['message']['time'],
        level: this.graylogAdapter.levelToCriticityLevel(
          log['message']['level'],
        ),
      });
    });

    return {
      source: config.serverName,
      env: config.env,
      logs,
    };
  }
}

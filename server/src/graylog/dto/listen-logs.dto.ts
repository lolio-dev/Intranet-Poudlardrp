import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { InstanceTypes, Environments } from '@types';

export class ListenToLogsDto {
  @IsString()
  serverName: string;

  @IsEnum(Environments)
  env: Environments;

  @IsEnum(InstanceTypes)
  instanceType: InstanceTypes;

  @IsNumber()
  @Type(() => Number)
  interval: number;
}

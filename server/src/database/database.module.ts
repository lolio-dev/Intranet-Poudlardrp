import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';

import { CommentaryEntity } from '../resources/commentaries/entities/commentary.entity';
import { UserEntity } from '../resources/users/entities/user.entity';
import { ProhibitedWordEntity } from '../resources/prohibited-words/entities/prohibited-word.entity';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('INTRANET_DB_HOST'),
        port: configService.get<number>('INTRANET_DB_PORT'),
        username: configService.get<string>('INTRANET_DB_USER'),
        password: configService.get<string>('INTRANET_DB_PASSWORD'),
        database: configService.get<string>('INTRANET_DB_DATABASE'),
        entities: [UserEntity, CommentaryEntity, ProhibitedWordEntity],
        synchronize: true
      })
    }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          client: 'mysql2',
          useNullAsDefault: true,
          connection: {
            host: configService.get<string>('MINECRAFT_DB_HOST'),
            port: configService.get<number>('MINECRAFT_DB_PORT'),
            password: configService.get<string>('MINECRAFT_DB_PASSWORD'),
            user: configService.get<string>('MINECRAFT_DB_USER'),
            database: configService.get<string>('MINECRAFT_DB_DATABASE')
          }
        }
      })
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
        if (
          configService.get('REDIS_DEV_HOST') &&
          configService.get('REDIS_DEV_PASSWORD') &&
          configService.get('REDIS_PROD_HOST') &&
          configService.get('REDIS_PROD_PASSWORD')
        ) {
          return {
            config: [
              {
                namespace: 'dev',
                host: configService.get('REDIS_DEV_HOST'),
                password: configService.get('REDIS_DEV_PASSWORD')
              },
              {
                namespace: 'prod',
                host: configService.get('REDIS_PROD_HOST'),
                password: configService.get('REDIS_PROD_PASSWORD')
              }
            ]
          };
        }
      }
    })
  ]
})
export class DatabaseModule {
}

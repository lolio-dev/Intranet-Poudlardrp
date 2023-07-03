import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { DiscordModule } from './discord/discord.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './resources/users/users.module';
import { RabbitModule } from './rabbit/rabbit.module';
import { GraylogModule } from './graylog/graylog.module';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './resources/players/players.module';
import { MojangModule } from './mojang/mojang.module';
import { SessionsModule } from './resources/sessions/sessions.module';
import { CommentariesModule } from './resources/commentaries/commentaries.module';
import { ServersModule } from './resources/servers/servers.module';
import { ProhibitedWordsModule } from './resources/prohibited-words/prohibited-words.module';
import { SanctionsModule } from './resources/sanctions/sanctions.module'
import { PathfinderModule } from './resources/pathfinder/pathfinder.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CommentariesModule,
    DatabaseModule,
    DiscordModule,
    AuthModule,
    UsersModule,
    RabbitModule,
    ServersModule,
    GraylogModule,
    PlayersModule,
    MojangModule,
    SessionsModule,
    SanctionsModule,
    ProhibitedWordsModule,
    PathfinderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

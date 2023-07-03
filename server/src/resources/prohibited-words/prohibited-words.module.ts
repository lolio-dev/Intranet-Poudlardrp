import { Module } from '@nestjs/common';
import { ProhibitedWordsService } from './prohibited-words.service';
import { ProhibitedWordsController } from './prohibited-words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProhibitedWordEntity } from './entities/prohibited-word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProhibitedWordEntity])],
  controllers: [ProhibitedWordsController],
  providers: [ProhibitedWordsService]
})
export class ProhibitedWordsModule {}

import { Module } from '@nestjs/common';
import { CommentariesService } from './commentaries.service';
import { CommentariesController } from './commentaries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaryEntity } from './entities/commentary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentaryEntity])],
  controllers: [CommentariesController],
  providers: [CommentariesService],
  exports: [CommentariesService],
})
export class CommentariesModule {}

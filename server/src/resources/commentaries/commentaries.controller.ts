import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-aut.guard';
import { UpdateResult } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { CommentariesService } from './commentaries.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { CommentaryDTO } from './dto/commentaty.dto';
import { CommentaryEntity } from './entities/commentary.entity';

@Controller('commentaries')
@UseGuards(JwtAuthGuard)
export class CommentariesController {
  constructor(private readonly commentaryService: CommentariesService) {}

  @Post()
  createCommentary(
    @Body() commentary: CreateCommentaryDto,
    @User() user: UserEntity,
  ): Observable<CommentaryDTO> {
    return this.commentaryService.create(user.id, commentary);
  }

  @Delete(':id')
  archive(@Param('id') id: string): Observable<UpdateResult> {
    return this.commentaryService.archive(id);
  }

  @Get(':target')
  getAllActiveTargetCommentaries(
    @Param('target') target: string,
  ): Observable<CommentaryEntity[]> {
    return this.commentaryService.getAllActiveTargetCommentaries(target);
  }

  @Get('staff/:staff')
  getAllActiveStaffCommentaries(
    @Param('staff') staff: string,
  ): Observable<CommentaryEntity[]> {
    return this.commentaryService.getAllActiveStaffCommentaries(staff);
  }
}

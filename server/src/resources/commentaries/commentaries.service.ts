import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { CommentaryStatus } from '@types';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { CommentaryDTO } from './dto/commentaty.dto';
import { CommentaryEntity } from './entities/commentary.entity';

@Injectable()
export class CommentariesService {
  constructor(
    @InjectRepository(CommentaryEntity)
    private commentaryRepository: Repository<CommentaryEntity>,
  ) {}

  public create(
    staff: string,
    commentaryCreate: CreateCommentaryDto,
  ): Observable<CommentaryDTO> {
    const commentary = this.commentaryRepository.create({
      target: commentaryCreate.target,
      staff,
      content: commentaryCreate.content,
      status: CommentaryStatus.Active,
    });
    return from(this.commentaryRepository.save(commentary));
  }

  public archive(id: string): Observable<UpdateResult> {
    return from(
      this.commentaryRepository.update(id, {
        status: CommentaryStatus.Archived,
      }),
    );
  }

  public getAllActiveTargetCommentaries(
    target: string,
  ): Observable<CommentaryEntity[]> {
    return from(
      this.commentaryRepository.find({
        where: { target, status: CommentaryStatus.Active },
        relations: ['staff']
      }),
    );
  }

  public getAllActiveStaffCommentaries(
    staff: string,
  ): Observable<CommentaryEntity[]> {
    return from(
      this.commentaryRepository.find({
        where: { staff, status: CommentaryStatus.Active },
      }),
    );
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { Roles } from '@types';

import { UserEntity } from './entities/user.entity';
import { UserPatchDto } from './dto/userPatch.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public sign(email) {
    return this.findOne({where: {email }})
    .pipe(map(user => user.uuid))
    .pipe(map(uuid => ({ token: this.jwtService.sign({ email, uuid }) })))
  }

  public find(options: FindManyOptions<UserEntity>): Observable<UserEntity[]> {
    return from(this.userRepository.find(options));
  }

  public findOne(options: FindOneOptions<UserEntity>): Observable<UserEntity> {
    return from(this.userRepository.findOne(options));
  }

  public create(email, nickname, picture): Observable<UserEntity> {
    const user = this.userRepository.create({
      email,
      nickname,
      picture,
      roles: [Roles.Member]
    });

    return from(this.userRepository.save(user));
  }

  public patch(id: string, patcher: UserPatchDto) {
    return from(this.userRepository.update({ id }, patcher));
  }
}

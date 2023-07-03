import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { map, Observable, of, switchMap } from 'rxjs';

import { UserEntity } from '../resources/users/entities/user.entity';
import { UsersService } from '../resources/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ConfigService,

    private userService: UsersService,
  ) {}

  public generateBearerToken(email: string) {
    return this.userService.sign(email);
  }

  googleLogin(req): Observable<UserEntity | null> {
    const { email, nickname, picture } = req.user;
    if (!email) return of(null);

    return this.userService
      .findOne({
        where: { email },
      })
      .pipe(
        switchMap( (user) => {
          if (!user) return this.userService.create(email, nickname, picture);
          if (picture !== user.picture) {
            this.userService.patch(user.id, { picture }).pipe(map(result => {
              return result.raw[0];
            }))
          }
          return of(user);
        }),
      );
  }
}

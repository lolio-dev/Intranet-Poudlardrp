import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    return true;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @Req() req,
    @Res() res: Response
  ) {
    this.authService.googleLogin(req)
      .pipe(tap(user => {
        if (!user) res.redirect(`${this.configService.get('WEBSITE_URL')}/login?error=NO_USER`);
        else {
          this.authService.generateBearerToken(user.email)
            .subscribe(({ token }) => {
              res.redirect(`${this.configService.get('WEBSITE_URL')}/login?access_token=${token}`);
            });
        }
      }))
      .subscribe();
  }
}

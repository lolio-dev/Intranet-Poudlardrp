import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserEntity } from '../../resources/users/entities/user.entity';

/**
 * Required to passed JWT Guard who injectprofilein request.user
 */
export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);

import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request;
  }
}

@Injectable()
export class JwtRoleAdminGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException('Your role does not allow access to this resource');
    }

    return true;
  }
}

@Injectable()
export class JwtRoleGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    if (user.role === Role.VISITANTE) {
      throw new ForbiddenException('Your role does not allow access to this resource');
    }

    return true;
  }
}

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Populated by JwtStrategy

    if (user && user.commerceAccountIsAdmin) {
      return true;
    }
    
    throw new ForbiddenException('Admin access required');
  }
}
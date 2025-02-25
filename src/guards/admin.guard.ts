import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    return req.currentUser?.admin;
  }
}

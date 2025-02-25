import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

interface CustomRequest extends Request {
  currentUser?: Partial<User>
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const { userId } = req.session;
    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user; 
    }
    next()
  }
}

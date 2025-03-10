import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

type InteceptType = Observable<any> | Promise<Observable<any>>;

interface ClassInterface {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassInterface) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassInterface) {
    this.dto = dto;
  }

  intercept(context: ExecutionContext, handler: CallHandler): InteceptType {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

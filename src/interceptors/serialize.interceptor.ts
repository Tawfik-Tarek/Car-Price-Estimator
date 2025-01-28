import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

type InteceptType = Observable<any> | Promise<Observable<any>>;

export function Serialize(dto: any){
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {

  constructor(private dto: any){
    this.dto = dto
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

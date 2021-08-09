import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        switch (error.constructor) {
          case EntityNotFoundError:
            return throwError(
              () => new NotFoundException('Recurso não encontrado.'),
            );
          case BadRequestException:
            return throwError(() => error);
          default:
            console.log('Erro não tratado', error);
        }

        return throwError(
          () => new InternalServerErrorException(`Erro não esperado: ${error}`),
        );
      }),
    );
  }
}

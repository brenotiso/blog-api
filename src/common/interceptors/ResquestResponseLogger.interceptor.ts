import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ResquestResponseLogger implements NestInterceptor {
  private readonly logger = new Logger(ResquestResponseLogger.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body } = req;

    this.logger.log(`Request ${originalUrl}`, {
      originalUrl,
      method,
      params,
      query,
      body,
    });

    const requestTime = Date.now();
    return next.handle().pipe(
      tap((data) =>
        this.logger.log('Response', {
          elapsedTime: `${Date.now() - requestTime} ms`,
          statusCode,
          data,
        }),
      ),
      catchError((error: HttpException) => {
        this.logger.log('Response', {
          elapsedTime: `${Date.now() - requestTime} ms`,
          statusCode: error.getStatus(),
          error: error.getResponse(),
        });
        return throwError(() => error);
      }),
    );
  }
}

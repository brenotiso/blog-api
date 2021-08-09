import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Reflector } from '@nestjs/core';
import { ResquestResponseLogger } from '../src/common/interceptors/ResquestResponseLogger.interceptor';
import { ErrorInterceptor } from '../src/common/interceptors/Error.interceptor';
import * as dotenv from 'dotenv';

describe('AauthorController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalInterceptors(
      new ResquestResponseLogger(),
      new ErrorInterceptor(),
      new ClassSerializerInterceptor(app.get(Reflector)),
    );

    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
          return new BadRequestException(validationErrors);
        },
        transform: true,
      }),
    );

    app.enableVersioning({
      type: VersioningType.URI,
    });

    await app.init();
  });

  it('/v1/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/authors')
      .expect(200)
      .expect([]);
  });

  afterAll(async () => {
    await app.close();
  });
});

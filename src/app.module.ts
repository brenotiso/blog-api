import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { blogConnectionConfiguration } from './database/connection';
import { AuthorModule } from './modules/author/author.module';
import { PublicationModule } from './modules/publication/publication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(blogConnectionConfiguration),
    AuthorModule,
    PublicationModule,
  ],
})
export class AppModule {}

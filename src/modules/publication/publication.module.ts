import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from '../../modules/author/author.repository';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { PublicationService } from './publication.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicationRepository, AuthorRepository]),
  ],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}

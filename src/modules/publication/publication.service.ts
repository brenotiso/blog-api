import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicationRequest } from './dto/publication-request';
import { PublicationFilter } from './dto/publication-filter';
import { Publication } from './publication.entity';
import { PublicationRepository } from './publication.repository';
import { Paginated } from 'common/paginated';
import { AuthorRepository } from '../author/author.repository';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(PublicationRepository)
    private publicationRepo: PublicationRepository,
    @InjectRepository(AuthorRepository)
    private authorRepo: AuthorRepository,
  ) {}

  async findAll(filters: PublicationFilter): Promise<Paginated<Publication>> {
    return this.publicationRepo.findAllWithFilters(filters);
  }

  async findById(id: number): Promise<Publication> {
    return this.publicationRepo.findOneOrFail({ id: id });
  }

  async create(publicationRequest: PublicationRequest): Promise<Publication> {
    const author = await this.authorRepo.findOne({
      id: publicationRequest.authorId,
    });

    if (!author) throw new BadRequestException('Autor não existe');

    return this.publicationRepo.save(
      PublicationRequest.toEntity(publicationRequest),
    );
  }

  async delete(id: number) {
    this.publicationRepo.delete({ id: id });
  }
}

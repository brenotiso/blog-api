import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { AuthorRepository } from './author.repository';
import { AuthorRequest } from './dto/author-request';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepo: AuthorRepository,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.authorRepo.find({});
  }

  async findById(id: number): Promise<Author> {
    return this.authorRepo.findOneOrFail({ id: id });
  }

  async create(authorRequest: AuthorRequest): Promise<Author> {
    return this.authorRepo.save(AuthorRequest.toEntity(authorRequest));
  }

  async delete(id: number) {
    this.authorRepo.delete({ id: id });
  }
}

import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {}

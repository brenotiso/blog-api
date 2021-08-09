import { Author } from '../author.entity';

export interface IAuthorRepository {
  add(author: Author): Promise<Author>;
  edit(author: Author): Promise<Author>;
  findAll(): Promise<Author[]>;
  findById(id: number): Promise<Author>;
  exclude(id: number): void;
}

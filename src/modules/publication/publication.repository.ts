import { Injectable } from '@nestjs/common';
import { Paginated } from '../../common/paginated';
import { EntityRepository, Repository } from 'typeorm';
import { PublicationFilter } from './dto/publication-filter';
import { IPublicationRepository } from './interfaces/publication-repository.interface';
import { Publication } from './publication.entity';

@Injectable()
@EntityRepository(Publication)
export class PublicationRepository
  extends Repository<Publication>
  implements IPublicationRepository
{
  async findAllWithFilters(
    filters: PublicationFilter,
  ): Promise<Paginated<Publication>> {
    const query = super
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.author', 'a')
      .orderBy('p.id');

    if (filters.author)
      query.andWhere('a.name ILIKE :authorName', {
        authorName: `'%${filters.author}%`,
      });

    if (filters.authorId)
      query.andWhere('a.id = :authorId', { authorId: filters.authorId });

    if (filters.createAfter)
      query.andWhere('p.createAt >= :createAfter', {
        createAfter: filters.createAfter,
      });

    const total = await query.getCount();

    const take = filters.limit || 10;
    const skip = (filters.page - 1) * take || 0;

    query.take(take).skip(skip);

    const page = new Paginated<Publication>();
    page.data = await query.getMany();
    page.total = total;

    return page;
  }
}

import { Publication } from '../publication.entity';
import { PublicationFilter } from '../dto/publication-filter';
import { Paginated } from 'common/paginated';

export interface IPublicationRepository {
  findAllWithFilters(
    filters: PublicationFilter,
  ): Promise<Paginated<Publication>>;
}

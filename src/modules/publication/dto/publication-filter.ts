import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationOptions } from '../../../common/pagination-options';

export class PublicationFilter extends PaginationOptions {
  @ApiPropertyOptional()
  author?: string;

  @ApiPropertyOptional()
  authorId?: number;

  @ApiPropertyOptional()
  createAfter?: Date;
}

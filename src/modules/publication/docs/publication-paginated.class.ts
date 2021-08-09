import { ApiProperty } from '@nestjs/swagger';
import { Publication } from '../publication.entity';

export class PublicationPaginated {
  @ApiProperty({ isArray: true, type: Publication })
  data: Publication[];

  @ApiProperty()
  total: number;
}

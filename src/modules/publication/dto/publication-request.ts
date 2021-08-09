import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Author } from '../../author/author.entity';
import { Publication } from '../publication.entity';

export class PublicationRequest {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsNumber()
  @ApiProperty()
  authorId: number;

  static toEntity(publicationRequest: PublicationRequest): Publication {
    const publication = new Publication();
    publication.title = publicationRequest.title;
    publication.content = publicationRequest.content;
    publication.author = new Author();
    publication.author.id = publicationRequest.authorId;
    return publication;
  }
}

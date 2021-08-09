import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';
import { Author } from '../author.entity';

export class AuthorRequest {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  nickname: string;

  @IsDateString()
  @ApiProperty({ type: Date })
  dateBirth: Date;

  static toEntity(authorRequest: AuthorRequest): Author {
    const author = new Author();
    author.name = authorRequest.name;
    author.nickname = authorRequest.nickname;
    author.dateBirth = new Date(authorRequest.dateBirth);
    return author;
  }
}

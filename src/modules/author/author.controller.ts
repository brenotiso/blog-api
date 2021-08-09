import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import { AuthorRequest } from './dto/author-request';

@ApiTags('Author')
@Controller({ path: '/authors', version: '1' })
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse()
  async findById(@Param('id') id: number): Promise<Author> {
    return await this.authorService.findById(id);
  }

  @Post()
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  create(@Body() author: AuthorRequest) {
    return this.authorService.create(author);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.authorService.delete(id);
  }
}

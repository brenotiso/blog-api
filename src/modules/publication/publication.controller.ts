import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationRequest } from './dto/publication-request';
import { Publication } from './publication.entity';
import { PublicationFilter } from './dto/publication-filter';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body } from '@nestjs/common';
import { Paginated } from 'common/paginated';
import { PublicationPaginated } from './docs/publication-paginated.class';

@Controller({ path: '/publications', version: '1' })
@ApiTags('Publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: PublicationPaginated,
  })
  findAll(
    @Query() filters: PublicationFilter,
  ): Promise<Paginated<Publication>> {
    return this.publicationService.findAll(filters);
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiResponse({ status: 200, type: Publication })
  findById(@Param('id') id: number): Promise<Publication> {
    return this.publicationService.findById(id);
  }

  @Post()
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  create(@Body() author: PublicationRequest) {
    return this.publicationService.create(author);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.publicationService.delete(id);
  }
}

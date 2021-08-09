import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationOptions {
  @Min(1)
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  limit?: number;

  @Min(1)
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  page?: number;
}

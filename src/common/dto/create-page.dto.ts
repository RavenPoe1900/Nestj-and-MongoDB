import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PageDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  readonly page: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  readonly page_size: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  readonly total: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  readonly pages: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  readonly prev_page: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  readonly next_page: number;
}
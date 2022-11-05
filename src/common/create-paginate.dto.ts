import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class PagintedDto{
    @ApiPropertyOptional({ minimum: 1, default: 1 })
    @IsInt()
    @Min(1)
    page: number = 1;

    @ApiPropertyOptional({ minimum: 5, maximum: 500, default: 5 })
    @IsInt()
    @Min(5)
    @Max(500)
    size: number = 5;    
}
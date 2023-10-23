import { IPageInfo } from 'src/common/interface/pageInfo.interface';
import { IsArray, IsInt, IsNotEmpty, ValidateNested} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ResponseFindDto{

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        description: "Number of items on the page",
        example:"50"
    })
    readonly XTotal: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        description: "Total of pages",
        example:"2"
    })
    readonly XTotalPages: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        description: "Quantity Per page",
        example:"23"
    })
    readonly XPerPage: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        description: "Current page",
        example:"2"
    })
    readonly XPage: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        description: "Next Page",
        example:"2"
    })
    readonly XNextPage: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        description: "Previos Page",
    })
    readonly XPrevPage: number;
}

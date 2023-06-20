import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsDefined, IsInt, ValidateNested } from 'class-validator';

export class FindDto<T> {
    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    XTotal: number;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    XTotalPages: number;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    XPerPage: number;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    XPage: number;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    XNextPage: number;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    XPrevPage: number;

    @IsDefined()
    @ValidateNested({ each: true })
    @ApiProperty()
    @Type(opt => (opt.newObject as FindDto<T>).type)
    data: T[];

    @Exclude()
    private type: Function;
  
    constructor(type: Function) {
      this.type = type;
    }
}

// rows: rows,
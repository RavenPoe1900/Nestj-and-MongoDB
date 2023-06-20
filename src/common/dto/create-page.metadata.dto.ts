import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageDto } from "./create-page.dto";

export class PaginatedMetadataDto<T>{

  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data:T[]; 
    
  @ApiProperty({ type: () => PageDto })
  readonly meta: PageDto;
}
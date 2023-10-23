import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class PaginationDroneDto {  
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === "true" || value === true || value === 1)
    @ApiProperty({
        description: "Checking available drones for loading;",
        example:`true`
    })
    availableDrones: boolean;  
}

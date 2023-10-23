import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { droneWeightLimit } from 'src/common/const/drone.const';

export class MedicationDto{    
    @IsNotEmpty()
    @Matches('^[A-Z0-9_]+$')
    @IsString()
    @ApiProperty({
        description: "Serial Number. 100 maximum size",
        example:"G15--ak0001na"
    })
    @MaxLength(100)
    @MinLength(1)
    readonly code: string;

    @IsNotEmpty()
    @Matches('^[a-zA-Z0-9_-]+$')
    @IsString()
    @ApiProperty({
        description: "Serial Number. 100 maximum size",
        example:"G15--ak0001na"
    })
    @MaxLength(100)
    @MinLength(1)
    readonly name: string;

    @IsNotEmpty()
    @IsInt()
    @Max(droneWeightLimit)
    @Min(0.1)
    @ApiProperty({
        description: "Medication Weight in gr",
        example:"2"
    })
    readonly weight: number;
}

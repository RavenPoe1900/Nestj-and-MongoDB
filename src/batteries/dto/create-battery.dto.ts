import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class BatteryDto{    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Serial Number. 100 maximum size",
        example:"G15--ak0001na"
    })
    @MaxLength(100)
    @MinLength(1)
    readonly serialNumber: string;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        description: "Battery Capacity in percentage",
        example:"78"
    })
    readonly batteryCapacity: number;
}

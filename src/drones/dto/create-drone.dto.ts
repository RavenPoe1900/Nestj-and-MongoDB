import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { droneWeightLimit } from 'src/common/const/drone.const';
import { DroneModel } from 'src/common/enum/done/droneModel.enum';
import { DroneState } from 'src/common/enum/done/droneState.enum';

export class DroneDto{        
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
    @Max(droneWeightLimit)
    @Min(0.1)
    @ApiProperty({
        description: `Weight Limit in gr. ${droneWeightLimit}gr maximum size`,
        example:"2"
    })
    readonly weightLimit: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        description: "Battery Capacity in percentage",
        example:"78"
    })
    readonly batteryCapacity: number;

    @IsNotEmpty()
    @IsEnum(Object.keys(DroneState))
    @ApiProperty({
        description: "State",
        example: `IDLE`
    }) 
    readonly state: DroneState;

    @IsNotEmpty()
    @IsEnum(Object.keys(DroneModel))
    @ApiProperty({
        description: "Dron Model",
        example: `Lightweight`
    }) 
    readonly model: DroneModel;
}

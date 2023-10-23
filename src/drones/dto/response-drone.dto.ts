import { ArrayNotEmpty, IsArray, IsOptional } from 'class-validator';
import { DroneDto } from './create-drone.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsObjectIdArray } from 'src/common/classValidator/isMongoIdArray.classValidator';
import { ObjectId } from 'mongoose';
export class ResponseDroneDto extends DroneDto{  
    @IsOptional()
    @ArrayNotEmpty()
    @IsArray()
    @IsObjectIdArray()
    @ApiProperty({
        description: "Medications",
        example:`["63790b2c8d2e82644dcc22ae"]`
    })
    medications: ObjectId [];   
}
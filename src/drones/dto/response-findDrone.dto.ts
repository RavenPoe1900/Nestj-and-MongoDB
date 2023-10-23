import { IPageInfo } from 'src/common/interface/pageInfo.interface';
import { Drone } from '../schemas/drone.schema';
import { IsArray, IsNotEmpty, ValidateNested} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ResponseFindDto } from 'src/common/dto/response-find.dto';

export class ResponseFindDroneDto<Drone> 
                    extends ResponseFindDto     
                    implements IPageInfo<Drone>
{
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Drone)
    @ApiProperty({
        description: "Transaction status class.",
        example: `[{
            "serialNumber": "G15--ak0001na",
            "weightLimit": "300gr",
            "batteryCapacity": 78,
            "state": "IDLE",
            "model": "Lightweight"
            "medications":[
                    {
                        "code": "G15--ak0001na",
                        "name": "Casandra",
                        "weight": 2,
                        "image": "sdad@sds.com"
                    }
                ]
            }
          }]`
    })
    readonly rows: Drone[];
}

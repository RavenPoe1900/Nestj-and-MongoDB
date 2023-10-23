import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { ResponseFindDto } from 'src/common/dto/response-find.dto';
import { IPageInfo } from 'src/common/interface/pageInfo.interface';
import { Medication } from '../schemas/medication.schema';

export class ResponseFindMedicationDto<Medication> 
                    extends ResponseFindDto     
                    implements IPageInfo<Medication>
{
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Medication)
    @ApiProperty({
        description: "Transaction status class.",
        example: `[{
            "code": "G15--ak0001na",
            "name": "Regina de la Caridad",
            "weight": 2,
            "image": "ana@ana.com"
          }]`
    })
    readonly rows: Medication[];
}

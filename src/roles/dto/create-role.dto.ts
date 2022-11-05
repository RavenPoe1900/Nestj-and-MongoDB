import { IsNumber, IsString } from "class-validator";

export class RoleDto {
    @IsString()
    name: string;
    @IsString()
    info: string;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsObjectId } from 'src/utils/classValidator/isMongoId.classValidator';

export class UserDto{
    @IsNotEmpty()
    @IsString()
    firstName: string;
    @IsNotEmpty()
    @IsString()
    lastName: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsObjectId()
    role: string;
}

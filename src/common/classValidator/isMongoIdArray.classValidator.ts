import { BadRequestException } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { Types as MongooseTypes } from 'mongoose';

export function IsObjectIdArray(validationOptions?: ValidationOptions): PropertyDecorator {    
    return (object: object, propertyName: string) => {
        if(!validationOptions) 
            validationOptions = {message:`${propertyName} must be an objectId`} 
        else 
            validationOptions.message = validationOptions.message === null
                                        ?`${propertyName} must be an objectId` 
                                        :validationOptions.message;
        registerDecorator({
        name: 'isObjectId',
        target: object.constructor,
        propertyName,
        options: validationOptions,
        validator: {
            validate(value: any, args: ValidationArguments) {
                let result = true;
                if(!value) throw new BadRequestException("Incorrect object array name")
                for (let index = 0; index < value.length; index++) {
                    if(!MongooseTypes.ObjectId.isValid(value[index]))
                        return false;                    
                }                
                return true;
            },
        },
        });
    };
}
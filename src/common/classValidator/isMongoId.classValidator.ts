import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { Types as MongooseTypes } from 'mongoose';

export function IsObjectId(validationOptions?: ValidationOptions): PropertyDecorator {    
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
                return MongooseTypes.ObjectId.isValid(value);
            },
        },
        });
    };
}
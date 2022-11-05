import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import {validationFile} from '../functions';

export class PowerPointValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return validationFile( value, 10000000, 'vnd.openxmlformats-officedocument.presentationml.presentation', 1);
  }
}



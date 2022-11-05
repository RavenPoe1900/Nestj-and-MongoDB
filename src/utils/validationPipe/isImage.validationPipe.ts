import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import {validationFile} from '../functions';

export class ImageValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return validationFile( value, 10000000, "image");
  }
}



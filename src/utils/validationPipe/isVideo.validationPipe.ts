import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import {validationFile} from '../functions';

export class VideoValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return validationFile( value, 1000000000, "video");
  }
}
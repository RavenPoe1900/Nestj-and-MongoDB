import { BadRequestException, createParamDecorator, ExecutionContext, Req } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import { nanoid } from 'nanoid';

function validationFile (value: any, size: number, file: string, index: number = 0){
  if (value.size > size)
    throw new BadRequestException("Does not meet size requirements");
  if (value.mimetype.split('/')[index] !== file)
    throw new BadRequestException("Does not meet type requirements");
  return value
}

function multerConfig(destinationName):MulterOptions{ 
   return {
        storage:diskStorage({
          destination:`./download/${destinationName}`,
          filename:(req, file, cb)=>{
            const fileNameSplit = file.originalname.split('.');
            const fileExt = fileNameSplit[fileNameSplit.length -1];
            const model = nanoid();
            cb(null, `${model}.${fileExt}`);
          }
        })
      }
}

export {
    validationFile,
    multerConfig,
}
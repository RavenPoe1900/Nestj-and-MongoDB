import { Type } from 'class-transformer';
import { Allow, IsNumber, IsString } from 'class-validator';

export class Mongo {
  @IsNumber()
  public readonly password: string;
  @IsString()
  public readonly user: string;
  @IsString()
  public readonly host: string;
  @IsString()
  public readonly port: number;
  @IsString()
  public readonly name: string;
}

export class Jwt {
  @IsString()
  public readonly key: string;
  @IsString()
  public readonly expire: string;
}

export class FileConfig {
  @IsString()
  public readonly destination: string;  
  @IsString()
  public readonly type: string;
}

export class UploadDictionary {
  @Type(() => FileConfig)
  public readonly powerPointUpload: FileConfig;  
  @Type(() => FileConfig)
  public readonly pdfUpload: FileConfig;
  @Type(() => FileConfig)
  public readonly videoUpload: FileConfig;  
  @Type(() => FileConfig)
  public readonly imageUpload: FileConfig;
}

export class UploadConfig {
  @Type(() => UploadDictionary)
  @Allow()
  public readonly fileConfig: UploadDictionary;
}

export class EnvConfig {
  @Type(() => Mongo)
  @Allow()
  public readonly mongoConig: Mongo;
  @Type(() => Jwt)
  @Allow()
  public readonly jwt: Jwt;
  @Type(() => UploadConfig)
  @Allow()
  public readonly uploadConfig: UploadConfig;;
}

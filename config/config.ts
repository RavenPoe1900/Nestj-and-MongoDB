import { TypedConfigModule, fileLoader, selectConfig } from 'nest-typed-config';
import { EnvConfig, Jwt, Mongo, UploadConfig } from './typeConfig';

export const ConfigModule = TypedConfigModule.forRoot({
    schema: EnvConfig,
    load: fileLoader({
      searchFrom:`${process.cwd()}/config/env/`,
    }),
});

export const jwtConfig = selectConfig(ConfigModule, Jwt);
export const mongoConfig = selectConfig(ConfigModule, Mongo);
export const uploadConfig = selectConfig(ConfigModule, UploadConfig);
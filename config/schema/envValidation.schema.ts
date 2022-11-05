import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(
    'development',
    'production',
    'test',
    'provision',
  ),
  MONGO_PASS:Joi.string().allow(null, ''),
  MONGO_USER:Joi.string().allow(null, ''),
  MONGO_HOST:Joi.string().default('localhost'),
  MONGO_PORT:Joi.number().default(27017),
  MONGO_NAME:Joi.string().required(),
});
import * as Joi from 'joi';

export const configSchemaValidation = Joi.object({
  STAGE: Joi.string().valid('dev', 'prod').required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  PORT: Joi.number().default(3000).required(),
  CLIENT_PORT: Joi.number().default(8080).required(),
});

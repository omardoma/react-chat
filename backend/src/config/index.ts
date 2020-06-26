import dotenv from 'dotenv';
dotenv.config();

// Important: Don't place any imports above the dotenv.config() as they use environment variables that needs to be loaded first
import joi from '@hapi/joi';
import { IConfig } from '../shared/types';

const envVarsValidation = joi
  .object({
    NODE_ENV: joi
      .string()
      .trim()
      .valid('development', 'production')
      .default('development'),
    PORT: joi
      .number()
      .port()
      .default(3000)
  })
  .validate(process.env, { stripUnknown: true, abortEarly: false });

if (envVarsValidation.error) {
  throw new Error(
    `Missing Environment Variables, please check the needed ones in src/config/index.ts. Error: ${envVarsValidation.error.message}`
  );
}

const config: IConfig = envVarsValidation.value;

export default config;

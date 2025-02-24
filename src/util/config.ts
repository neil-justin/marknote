import dotenv from 'dotenv';

dotenv.config();

interface EnvVariables {
  PORT: number;
  MONGODB_URI: string;
}

const envVariables: EnvVariables = {
  PORT: parseInt(process.env.PORT) || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
};

export const { PORT, MONGODB_URI } = envVariables;

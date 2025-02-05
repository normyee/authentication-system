import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || 'http://localhost';

export const DATABASE_URL = process.env.DATABASE_URL;

export const GMAIL_PROVIDER = {
  EMAIL: process.env.GMAIL_EMAIL,
  APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
};

export const SECREY_KEY = process.env.SECREY_KEY;

export const QUEUE_HOST = process.env.QUEUE_HOST;

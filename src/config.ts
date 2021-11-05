import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL
}

export default config
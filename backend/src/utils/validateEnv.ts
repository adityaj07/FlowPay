import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";
import { config } from "dotenv";
config();

const env = cleanEnv(process.env, {
  MONGO_URL: str(),
  PORT: port(),
  JWT_SECRET: str(),
  FRONTEND_URL: str()
});

export default env;

import express, { Request, Response } from "express";
import env from "../src/utils/validateEnv";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import rootRouter from "../src/routes";

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", env.FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT,UPDATE, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", rootRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Jai Shri Ram ji");
});

app.listen(env.PORT, () => {
  console.log("Server running at port: ", env.PORT);
});

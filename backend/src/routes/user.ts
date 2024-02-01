import authMiddleware from "../middlewares/user";
import { bulk, login, signup, updateUser } from "../controllers/user";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login",authMiddleware, login);
userRouter.put("/", authMiddleware, updateUser);
userRouter.get("/bulk",authMiddleware, bulk )

export default userRouter;

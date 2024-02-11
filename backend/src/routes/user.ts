import authMiddleware from "../middlewares/user";
import {
  bulk,
  deleteUser,
  getUser,
  login,
  logout,
  signup,
  updateUser,
} from "../controllers/user";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", authMiddleware, logout);
userRouter.get("/", authMiddleware, getUser);
userRouter.put("/updateUser", authMiddleware, updateUser);
userRouter.get("/bulk", authMiddleware, bulk);
userRouter.delete("/deleteUser", authMiddleware, deleteUser);

export default userRouter;

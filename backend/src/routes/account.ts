import { getBalance, transfer } from "../controllers/account";
import authMiddleware from "../middlewares/user";
import { Router } from "express";

const accountRouter = Router();

accountRouter.get("/balance",authMiddleware, getBalance )
accountRouter.post("/transfer",authMiddleware, transfer )


export default accountRouter;
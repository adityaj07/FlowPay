import { Request, Response } from "express";
import { config } from "dotenv";
import { connectDB } from "../db/db";
import { statusCode } from "../types/types";
import Account from "../models/Account";
import mongoose from "mongoose";
config();

connectDB();

export const getBalance = async (req: Request, res: Response) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account) {
      return res.status(statusCode.notFound).json({
        message: "User with this account not found!",
      });
    }

    res.status(statusCode.success).json({
      message: "User found",
      balance: account.balance,
    });
  } catch (error) {
    console.error("Error fetching user's balance:", error);
    res.status(statusCode.internalError).json({
      message: "Internal server error",
    });
  }
};

export const transfer = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  try {
    //Transaction starting here
    session.startTransaction();
    const { to, amount } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(statusCode.notAccepted).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(statusCode.notAccepted).json({
        message: "Invalid account",
      });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.status(statusCode.success).json({
      message: "Transfer Successful",
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error in transferring money:", error);
    res.status(statusCode.internalError).json({
      message: "Internal server error",
    });
  }
};

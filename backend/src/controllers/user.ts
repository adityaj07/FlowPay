import { Request, Response } from "express";
import env from "../utils/validateEnv";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { connectDB } from "../db";
import { statusCode } from "../types/types";
import { signupBody, loginBody, updateBody } from "../types/authTypes";
config();

connectDB();

export const signup = async (req: Request, res: Response) => {
  const { username, firstName, lastName, password } = req.body;

  //zod input validation
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(statusCode.notAccepted).json({
      message: "Incorrect inputs",
    });
  }

  //checking for existing user
  const existingUser = await User.findOne({
    username,
  });
  if (existingUser) {
    return res.status(statusCode.notAccepted).json({
      message: `User with email ${username} already exists!`,
    });
  }

  //hahsing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //creating a new user
  const newUser = await User.create({
    username,
    firstName,
    lastName,
    password: hashedPassword,
  });

  const userId = newUser._id;

  const token = jwt.sign(
    {
      userId,
    },
    env.JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { success } = loginBody.safeParse(req.body);
  if (!success) {
    return res.status(statusCode.notAccepted).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(statusCode.notFound)
      .json({ message: "User does not exist" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res
      .status(statusCode.invalidCredentials)
      .json({ message: "Invalid credentials" });
  }

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      env.JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(statusCode.notAccepted).json({
    message: "Error while logging in",
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;

  //zod input validation
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(statusCode.notAccepted).json({
      message: "Error while updating information",
    });
  }

  // Update user information
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.userId }, // Query to find the user by userId
    { firstName, lastName, password }, // Updated fields
    { new: true } // Return the modified document
  );

  // Check if user was found and updated
  if (!updatedUser) {
    return res.status(statusCode.notFound).json({
      message: "User not found",
    });
  }

  res.status(statusCode.success).json({
    message: "Updated Successfully",
  });
};

export const bulk = async (req: Request, res: Response) => {
  const filter = req.query.filter || "";

  try {
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    const mappedUsers = users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    }));

    res.status(statusCode.success).json({
      users: mappedUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(statusCode.internalError).json({
      message: "Internal server error",
    });
  }
};

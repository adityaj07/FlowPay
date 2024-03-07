import { Request, Response } from "express";
import env from "../utils/validateEnv";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { connectDB } from "../db/db";
import { statusCode } from "../types/types";
import { signupBody, loginBody, updateBody } from "../types/authTypes";
import Account from "../models/Account";

connectDB();

interface UserDTO {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export const signup = async (req: Request, res: Response) => {
  try {
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

    //creating an account for the user and giving them random amount of balance to start with
    const newAccount = await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign(
      {
        userId,
      },
      env.JWT_SECRET
    );

    res.cookie("Bearer", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({
      message: "User created successfully",
      token: token,
      balance: newAccount,
    });
  } catch (error) {
    console.error("Error while signing up the user:", error);
    res.status(statusCode.internalError).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const { success } = loginBody.safeParse(req.body);
    if (!success) {
      return res.status(statusCode.notAccepted).json({
        message: "Incorrect inputs",
      });
    }

    const user = await User.findOne({ username }).select("+password");
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
        env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const userId = user._id.toString();
      // If password is valid, create user DTO(Data Transfer Object) without password to send it to the frontend
      const userDTO: UserDTO = {
        _id: userId,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      res.cookie("Bearer", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.json({
        token: token,
        userDTO,
        message: "Login successful",
      });
    }

    res.status(statusCode.notAccepted).json({
      message: "Error while logging in",
    });
  } catch (error) {
    console.error("Error logging in the user:", error);
    res.status(statusCode.internalError).json({
      message: "Internal server error",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      _id: req.userId,
    });

    if (!user) {
      return res.status(statusCode.notFound).json({
        message: "User not found",
      });
    }

    res.status(statusCode.success).json({
      message: "User found",
      user,
    });
  } catch (error) {
    console.error("Error getting the user:", error);
    res.status(statusCode.internalError).json({
      message: "Internal server error",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password } = req.body;

    //zod input validation
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
      return res.status(statusCode.notAccepted).json({
        message: "Error while updating information",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if it's a test user
    const testUser = await User.findOne({
      _id: req.userId,
    });

    if (testUser?.username === "user@gmail.com") {
      // If it's a test user, update only the firstName and lastName
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.userId }, // Query to find the user by userId
        { firstName, lastName }, // Updated fields
        { new: true } // Return the modified document
      );

      return res.status(statusCode.notAccepted).json({
        message: "The password cannot be updated on a test account!",
        user: updatedUser,
      });
    }

    // If not test user, Update the user info, including the hashed password
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId }, // Query to find the user by userId
      { firstName, lastName, password: hashedPassword }, // Updated fields, including the hashed password
      { new: true } // Return the modified document
    );

    if (!updatedUser) {
      return res.status(statusCode.notFound).json({
        message: "User not found",
      });
    }

    res.status(statusCode.success).json({
      message: "Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating the user:", error);
    res.status(statusCode.internalError).json({
      message: "Internal server error",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    // Clear the token cookie to log the user out
    res.clearCookie("Bearer");
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(statusCode.internalError).json({
      message: "Internal server error",
    });
  }
};

export const bulk = async (req: Request, res: Response) => {
  const filter = req.query.filter || "";
  const currentUserId = req.userId;

  try {
    const users = await User.find({
      $and: [
        {
          _id: { $ne: currentUserId },
        },
        {
          $or: [
            {
              firstName: {
                $regex: filter,
                $options: "i", // Case-insensitive option
              },
            },
            {
              lastName: {
                $regex: filter,
                $options: "i", // Case-insensitive option
              },
            },
          ],
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      _id: req.userId,
    });

    if (!user) {
      return res.status(statusCode.notFound).json({
        message: "User not found",
      });
    }

    if (user.username === "user@gmail.com") {
      return res.status(statusCode.notAccepted).json({
        message: "You are not allowed to delete a test account.",
      });
    }

    // Find and delete the associated account
    await Account.findOneAndDelete({
      userId: user._id,
    });

    // Delete the user
    await User.deleteOne({
      _id: user._id,
    });

    res.status(statusCode.success).json({
      message: "User and associated account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(statusCode.internalError).json({
      message: "Internal server error",
    });
  }
};

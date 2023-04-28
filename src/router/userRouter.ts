import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controllers/UserController";
import { UserDatabase } from "../database/UserDatabase";

export const userRouter = express.Router();

const userController = new UserController(new UserBusiness(new UserDatabase()));

userRouter.post("/signup", userController.signUp);

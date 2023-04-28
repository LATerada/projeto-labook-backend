import { Request, Response } from "express";
import { ZodError } from "zod";
import { UserBusiness } from "../business/UserBusiness";
import { UserLoginSchema } from "../dtos/users/userLogin.dto";
import { UserSignupSchema } from "../dtos/users/userSignup.dto";
import { BaseError } from "../errors/BaseError";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  userSignup = async (req: Request, res: Response) => {
    try {
      const input = UserSignupSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const output = await this.userBusiness.userSignup(input);

      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected Error");
      }
    }
  };

  userLogin = async (req: Request, res: Response) => {
    try {
      const input = UserLoginSchema.parse({
        email: req.body.email,
        password: req.body.password,
      });

      const output = await this.userBusiness.userLogin(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected Error");
      }
    }
  };
}

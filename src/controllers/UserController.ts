import { Request, Response } from "express";
import { ZodError } from "zod";
import { UserBusiness } from "../business/UserBusiness";
import { SignUpSchema } from "../dtos/users/signUp.dto";
import { BaseError } from "../errors/BaseError";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  signUp = async (req: Request, res: Response) => {
    try {
      const input = SignUpSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const output = await this.userBusiness.signUp(input);

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
}

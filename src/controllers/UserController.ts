import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  signUp = async (req: Request, res: Response) => {
    const input = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const output = await this.userBusiness.signUp(input);

    res.status(201).send(output);
  };
}

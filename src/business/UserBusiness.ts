import { UserDatabase } from "../database/UserDatabase";
import { UserLoginInputDTO } from "../dtos/users/UserLogin.dto";
import { UserSignupInputDTO } from "../dtos/users/UserSignup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UserDB, Users } from "../models/Users";
import { HashManager } from "../services/HashManeger";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManeger";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManeger: TokenManager,
    private hashManeger: HashManager
  ) {}

  async userSignup(input: UserSignupInputDTO) {
    const { name, email, password } = input;

    const userBDExists = await this.userDatabase.findUserByEmail(email);

    if (userBDExists) {
      throw new BadRequestError("'email' already registered");
    }

    const newUser = new Users(
      `u${email}`,
      name,
      email,
      password,
      "role",
      `${new Date()}`
    );

    const newUserDB: UserDB = {
      id: newUser.getId(),
      name: newUser.getName(),
      email: newUser.getEmail(),
      password: newUser.getPassaword(),
      role: newUser.getRole(),
      created_at: newUser.getCreatedAt(),
    };

    await this.userDatabase.postUser(newUserDB);

    const output = {
      token: "signinToken",
    };

    return output;
  }

  async userLogin(input: UserLoginInputDTO) {
    const { email, password } = input;

    const userBDExists = await this.userDatabase.findUserByEmail(email);

    if (!userBDExists) {
      throw new NotFoundError("User not founded");
    }

    if (userBDExists.password !== password) {
      throw new BadRequestError("Incorrect password");
    }

    // generate token

    const output = {
      token: "loginInput",
    };

    return output;
  }
}

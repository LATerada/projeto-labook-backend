import { UserDatabase } from "../database/UserDatabase";
import { LoginInputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { TokenPayload, UserDB, Users, USER_ROLES } from "../models/Users";
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

  async signup(input: SignupInputDTO) {
    const { name, email, password } = input;

    const userBDExists = await this.userDatabase.findUserByEmail(email);

    if (userBDExists) {
      throw new ConflictError("email already exists");
    }

    const id = this.idGenerator.generate();
    const hashedPassword = await this.hashManeger.hash(password);

    const newUser = new Users(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.NORMAL,
      new Date().toISOString()
    );

    const newUserDB = newUser.toDBModel();
    await this.userDatabase.postUser(newUserDB);

    const payload: TokenPayload = {
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole(),
    };

    const token = this.tokenManeger.createToken(payload);

    const output: SignupOutputDTO = {
      token,
    };

    return output;
  }

  async userLogin(input: LoginInputDTO) {
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

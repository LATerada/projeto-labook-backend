import { UserDatabase } from "../database/UserDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { UserDB, Users } from "../models/Users";

export class UserBusiness {
  constructor(private userDatabase: UserDatabase) {}

  async signUp(input: any) {
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

    const newUserDB :UserDB = {
      id: newUser.getId(),
      name: newUser.getName(),
      email: newUser.getEmail(),
      password: newUser.getPassaword(),
      role: newUser.getRole(),
      created_at: newUser.getCreatedAt()
    }

    await this.userDatabase.postUser(newUserDB)

    const output = {
      token: newUserDB,
    };

    return output;
  }
}

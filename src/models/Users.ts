export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export interface UserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

export class Users {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: string,
    private createdAt: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
  public setName(value: string) {
    this.name = value;
  }

  public getEmail(): string {
    return this.email;
  }
  public setEmail(value: string) {
    this.email = value;
  }

  public getPassaword(): string {
    return this.password;
  }
  public setPassword(value: string) {
    this.password = value;
  }

  public getRole(): string {
    return this.role;
  }
  public setRole(value: string) {
    this.role = value;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }
}

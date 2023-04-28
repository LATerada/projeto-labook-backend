import z from "zod";

export interface UserLoginInputDTO {
  email: string;
  password: string;
}

export const UserLoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .transform((data) => data as UserLoginInputDTO);

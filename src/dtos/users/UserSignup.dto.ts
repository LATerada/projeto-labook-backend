import z from "zod";

export interface UserSignupInputDTO {
  name: string;
  email: string;
  password: string;
}

export const UserSignupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .transform((data) => data as UserSignupInputDTO);

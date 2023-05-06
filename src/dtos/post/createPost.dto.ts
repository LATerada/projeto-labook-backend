import z from "zod";

export interface CreatePostInputDTO {
  toke: string;
  content: string;
}

export type CreatePostOutputDTO = undefined;

export const CreatePostSchema = z
  .object({
    toke: z.string().min(1),
    content: z.string().min(1),
  })
  .transform((data) => data as CreatePostInputDTO);

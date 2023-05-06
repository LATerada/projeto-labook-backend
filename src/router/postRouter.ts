import express from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostControlers } from "../controllers/PostControllers";
import { PostDatabase } from "../database/PostDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManeger";

export const postRouter = express.Router();

const postController = new PostControlers(
  new PostBusiness(new PostDatabase(), new IdGenerator(), new TokenManager())
);

postRouter.get("/", postController.getPosts);

postRouter.post("/", postController.postPost);

postRouter.put("/:id", postController.putPost);

postRouter.delete("/:id", postController.deletePosts);

import express from "express";
import { PostControlers } from "../controllers/PostControllers";

export const postRouter = express.Router();

const postController = new PostControlers();

postRouter.get("/", postController.getPosts);

postRouter.post("/", postController.postPost);

postRouter.put("/:id", postController.putPost);

postRouter.delete("/:id", postController.deletePosts);

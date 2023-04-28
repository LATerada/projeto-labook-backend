import express from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostControlers } from "../controllers/PostControllers";
import { PostDatabase } from "../database/PostDatabase";

export const postRouter = express.Router();

const postController = new PostControlers(new PostBusiness(new PostDatabase()));

postRouter.get("/", postController.getPosts);

postRouter.post("/", postController.postPost);

postRouter.put("/:id", postController.putPost);

postRouter.delete("/:id", postController.deletePosts);

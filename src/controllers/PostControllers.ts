import { Request, Response } from "express";
import { PostDatabase } from "../database/PostDatabase";
import { Post } from "../models/Posts";
import { PostDB } from "../types";

export class PostControlers {
  getPosts = async (req: Request, res: Response) => {
    try {
      const postDatabase = new PostDatabase();

      const postsDB: PostDB[] = await postDatabase.findPosts();

      const posts = postsDB.map((postDB) => {
        new Post(
          postDB.id,
          postDB.creatorId,
          postDB.content,
          postDB.likes,
          postDB.dislikes,
          postDB.createdAt,
          postDB.updatedAt
        );
      });

      res.status(200).send(posts);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
}

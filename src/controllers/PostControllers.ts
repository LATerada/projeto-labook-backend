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
          postDB.creator_id,
          postDB.content,
          postDB.likes,
          postDB.dislikes,
          postDB.created_at,
          postDB.updated_at
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
  postPost = async (req: Request, res: Response) => {
    try {
      const { id, creatorId, content } = req.body;

      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }
      if (id[0] !== "p") {
        res.status(400);
        throw new Error("'id' deve iniciar com 'p'");
      }
      if (id.length < 4) {
        res.status(400);
        throw new Error("'id' deve conter pelo menos 4 caracteres");
      }

      if (typeof creatorId !== "string") {
        res.status(400);
        throw new Error("'creatorId' deve ser string");
      }
      if (creatorId[0] !== "u") {
        res.status(400);
        throw new Error("'creatorId' deve iniciar com 'u'");
      }
      if (creatorId.length < 4) {
        res.status(400);
        throw new Error("'creatorId' deve conter pelo menos 4 caracteres");
      }

      if (typeof content !== "string") {
        res.status(400);
        throw new Error("'content' deve ser string");
      }
      if (content.length < 1) {
        res.status(400);
        throw new Error("'content' deve conter pelo menos 1 caracteres");
      }

      const postDatabase = new PostDatabase();
      const postDBExists = await postDatabase.findPostsById(id);

      if (postDBExists) {
        res.status(400);
        throw new Error("'id' já existe");
      }

      const newPost = new Post(
        id,
        creatorId,
        content,
        0,
        0,
        new Date().toString(),
        new Date().toString()
      );

      const newPostDB: PostDB = {
        id: newPost.getId(),
        creator_id: newPost.getCreatorId(),
        content: newPost.getContent(),
        likes: newPost.getLikes(),
        dislikes: newPost.getDislikes(),
        created_at: newPost.getCreatedAt(),
        updated_at: newPost.getUdatedAt(),
      };

      await postDatabase.createPost(newPostDB);

      res.status(200).send(newPostDB);
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
  putPost = async (req: Request, res: Response) => {
    try {
      const idToEdit = req.params.id;
      const newContent = req.body.content as string | undefined;

      if (newContent !== undefined) {
        if (typeof newContent !== "string") {
          res.status(400);
          throw new Error("'content' deve ser string");
        }
        if (newContent.length < 1) {
          res.status(400);
          throw new Error("'content' deve conter pelo menos 1 caracteres");
        }
      }

      const postDatabase = new PostDatabase();
      const postDBExists = await postDatabase.findPostsById(idToEdit);

      if (!postDBExists) {
        res.status(404);
        throw new Error("'id' não existe");
      }

      const post = new Post(
        idToEdit,
        postDBExists.creator_id,
        newContent ? newContent : postDBExists.content,
        postDBExists.likes,
        postDBExists.dislikes,
        postDBExists.created_at,
        new Date().toString()
      );

      const newPostDB: PostDB = {
        id: post.getId(),
        creator_id: post.getCreatorId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikes: post.getDislikes(),
        created_at: post.getCreatedAt(),
        updated_at: post.getUdatedAt(),
      };

      await postDatabase.editPost(newPostDB);
      res.status(201).send(newPostDB);
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
  deletePosts = async (req: Request, res: Response) => {
    try {
      const idToDelete = req.params.id;

      const postDatabase = new PostDatabase();
      const postDBExists = postDatabase.findPostsById(idToDelete);

      if (!postDBExists) {
        res.status(404);
        throw new Error("'id' não existe");
      }

      await postDatabase.removePost(idToDelete);

      res.status(200).send("Post deletado com sucesso");
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

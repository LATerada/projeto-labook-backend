import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { BaseError } from "../errors/BaseError";

export class PostControlers {
  constructor(private postBusiness: PostBusiness) {}

  public getPosts = async (req: Request, res: Response) => {
    try {
      const output = await this.postBusiness.getPost();

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public postPost = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.body.id,
        creatorId: req.body.creator_id,
        content: req.body.content,
      };

      const output = await this.postBusiness.postPost(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public putPost = async (req: Request, res: Response) => {
    try {
      const input = {
        idToEdit: req.params.id,
        newContent: req.body.content,
      };
      const output = await this.postBusiness.putPost(input);
      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public deletePosts = async (req: Request, res: Response) => {
    try {
      const input = { idToDelete: req.params.id };

      const output = this.postBusiness.deletePost(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}

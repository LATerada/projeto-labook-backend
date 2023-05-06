import { PostDatabase } from "../database/PostDatabase";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPosts.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Post, PostDB } from "../models/Posts";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManeger";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManeger: TokenManager
  ) {}

  public getPost = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManeger.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError("Invalid token");
    }

    const postsWithCreatorName =
      await this.postDatabase.findPostsWithCreatorName();

    const posts = postsWithCreatorName.map((postWithCreatorName) => {
      const post = new Post(
        postWithCreatorName.id,
        postWithCreatorName.content,
        postWithCreatorName.likes,
        postWithCreatorName.dislikes,
        postWithCreatorName.created_at,
        postWithCreatorName.updated_at,
        postWithCreatorName.creator_id,
        postWithCreatorName.creator_name
      );
      return post.toBusinessModel();
    });

    const output: GetPostsOutputDTO = posts;

    return output;
  };

  public postPost = async (input: any) => {
    const { id, creatorId, content } = input;

    if (typeof id !== "string") {
      throw new Error("'id' deve ser string");
    }
    if (id[0] !== "p") {
      throw new Error("'id' deve iniciar com 'p'");
    }
    if (id.length < 4) {
      throw new Error("'id' deve conter pelo menos 4 caracteres");
    }

    if (typeof creatorId !== "string") {
      throw new Error("'creatorId' deve ser string");
    }
    if (creatorId[0] !== "u") {
      throw new Error("'creatorId' deve iniciar com 'u'");
    }
    if (creatorId.length < 4) {
      throw new Error("'creatorId' deve conter pelo menos 4 caracteres");
    }

    if (typeof content !== "string") {
      throw new Error("'content' deve ser string");
    }
    if (content.length < 1) {
      throw new Error("'content' deve conter pelo menos 1 caracteres");
    }

    const postDBExists = await this.postDatabase.findPostsById(id);

    if (postDBExists) {
      throw new BadRequestError("'id' already exists");
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

    await this.postDatabase.createPost(newPostDB);

    const output = {
      newPostDB,
    };

    return output;
  };

  public putPost = async (input: any) => {
    const { idToEdit, newContent } = input;

    if (newContent !== undefined) {
      if (typeof newContent !== "string") {
        throw new Error("'content' deve ser string");
      }
      if (newContent.length < 1) {
        throw new Error("'content' deve conter pelo menos 1 caracteres");
      }
    }

    const postDBExists = await this.postDatabase.findPostsById(idToEdit);

    if (!postDBExists) {
      throw new NotFoundError("'id' doesn't exist");
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

    await this.postDatabase.editPost(newPostDB);

    const output = {
      newPostDB,
    };

    return output;
  };

  public deletePost = async (input: any) => {
    const { idToDelete } = input;

    const postDBExists = this.postDatabase.findPostsById(idToDelete);

    if (!postDBExists) {
      throw new NotFoundError("'id' doesn't exist");
    }

    await this.postDatabase.removePost(idToDelete);

    const output = {
      message: "Post Deletado com sucesso",
    };

    return output;
  };
}

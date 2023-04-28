import { PostDatabase } from "../database/PostDatabase";
import { Post, PostDB } from "../models/Posts";

export class PostBusiness {
  constructor(private postDatabase: PostDatabase) {}

  async getPost() {
    const postsDB: PostDB[] = await this.postDatabase.findPosts();

    const posts = postsDB.map((postDB) => {
      return new Post(
        postDB.id,
        postDB.creator_id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at
      );
    });

    const output = {
      posts,
    };

    return output;
  }

  async postPost(input: any) {
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

    await this.postDatabase.createPost(newPostDB);

    const output = {
      newPostDB,
    };

    return output;
  }

  async putPost(input: any) {
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

    await this.postDatabase.editPost(newPostDB);

    const output = {
      newPostDB,
    };

    return output;
  }

  async deletePost(input: any) {
    const { idToDelete } = input;

    const postDBExists = this.postDatabase.findPostsById(idToDelete);

    if (!postDBExists) {
      throw new Error("'id' não existe");
    }

    await this.postDatabase.removePost(idToDelete);

    const output = {
      message: "Post Deletado com sucesso",
    };

    return output;
  }
}

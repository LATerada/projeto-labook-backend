import { BaseDatabase } from "./BaseDatabase";
import { PostDB } from "../types";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts";

  public async findPosts(): Promise<PostDB[]> {
    const postsDB: PostDB[] = await BaseDatabase.connection(
      PostDatabase.TABLE_POSTS
    );
    return postsDB;
  }

  public async findPostsById(id: string): Promise<PostDB | undefined> {
    const [postsDB]: PostDB[] | undefined[] = await BaseDatabase.connection(
      PostDatabase.TABLE_POSTS
    ).where({ id });
    return postsDB;
  }

  public async createPost(newPost: PostDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(newPost);
  }

  public async editPost(newPost: PostDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .update(newPost)
      .where({ id: newPost.id });
  }

  public async removePost(id: string): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS).del().where({ id });
  }
}

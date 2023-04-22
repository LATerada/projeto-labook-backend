import { BaseDatabase } from "./BaseDatabase";
import { PostsDB } from "./types";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts";

  public async findPosts(
    q: string | undefined
  ): Promise<PostsDB[] | undefined[]> {
    const postsDB: PostsDB[] | undefined[] = await BaseDatabase.connection(
      PostDatabase.TABLE_POSTS
    );
    return postsDB;
  }
}

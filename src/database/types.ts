export interface UsersDB {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

export interface PostsDB {
  id: string;
  creatorId: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
}

export interface LikesDislikesDB {
  user_id: string;
  post_id: string;
  like: number;
}

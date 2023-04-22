export interface UserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

export interface PostDB {
  id: string;
  creatorId: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
}

export interface LikeDislikeDB {
  user_id: string;
  post_id: string;
  like: number;
}

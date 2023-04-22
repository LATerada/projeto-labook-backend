export class Post {
  constructor(
    private id: string,
    private creatorId: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }
  public setCreatorID(newCreatorId: string) {
    this.creatorId = newCreatorId;
  }

  public getContent(): string {
    return this.content;
  }
  public setContent(newContent: string) {
    this.content = newContent;
  }

  public getLikes(): number {
    return this.likes;
  }
  public setLikes(newLikes: number) {
    this.likes = newLikes;
  }

  public getDislikes(): number {
    return this.dislikes;
  }
  public setDislikes(newDislikes: number) {
    this.dislikes = newDislikes;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getUdatedAt(): string {
    return this.updatedAt;
  }
  public setUpdatedAt(newUpdatedAt: string) {
    this.updatedAt = newUpdatedAt;
  }
}

export interface Comment {
  id: number,
  userId: string,
  userUserName: string,
  imageUrl: string,
  content: number,
  children: Comment[]
}

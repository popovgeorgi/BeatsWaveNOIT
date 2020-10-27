export interface Comment {
  id: string,
  userId: string,
  userUserName: string,
  imageUrl: string,
  content: number,
  children: Comment[]
}

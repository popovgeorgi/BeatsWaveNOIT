export interface Notification {
  message: string,
  isSeen: boolean,
  type: string,
  initiatorId: string,
  initiatorImage: string,
  createdOn: Date
}

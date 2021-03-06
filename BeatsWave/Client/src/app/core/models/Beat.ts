export interface Beat {
    id: number,
    name: string,
    imageUrl: string,
    url: string,
    producerUserName: string,
    price: number,
    bpm : number,
    producerId: string,
    genre: string,
    description: string,
    likesCount: number,
    commentsCount: number,
    isLiked: boolean,
    createdOn: Date,
    producerProfileMainPhotoUrl: string,
    producerEmail: string,
    isProducerReceivingEmails: boolean
}

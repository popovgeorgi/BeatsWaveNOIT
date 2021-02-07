import { Beat } from './Beat';

export interface Artist {
    id: string,
    userName: string,
    createdOn: Date,
    profileFirstName: string,
    profileLastName: string,
    profileMainPhotoUrl: string,
    followersCount: number,
    profileBiography: string,
    beats: Beat[]
}

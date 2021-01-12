import { Beat } from './Beat';

export interface Artist {
    id: string,
    userName: string,
    profileFirstName: string,
    profileLastName: string,
    profileMainPhotoUrl: string,
    followersCount: number,
    profileBiography: string,
    beats: Beat[]
}

import { Beat } from './Beat';

export interface Artist {
    id: string,
    profileFirstName: string,
    profileLastName: string,
    profileMainPhotoUrl: string,
    followersCount: number,
    profileBiography: string,
    beats: Beat[]
}

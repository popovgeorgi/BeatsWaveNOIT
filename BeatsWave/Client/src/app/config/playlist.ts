export class PlaylistConfig {

    public config: any = {};

    constructor() {
        this.config = {
            items: [
                {
                    id: 1,
                    name: 'DJ Remix',
                    cover_url: './assets/images/background/horizontal/1.jpg'
                },
                {
                    id: 2,
                    name: 'Rock Band',
                    cover_url: './assets/images/background/horizontal/2.jpg'
                },
                {
                    id: 3,
                    name: 'Solo Special',
                    cover_url: './assets/images/background/horizontal/3.jpg'
                },
                {
                    id: 4,
                    name: 'Romantic',
                    cover_url: './assets/images/background/horizontal/4.jpg'
                },
                {
                    id: 5,
                    name: 'GYM',
                    cover_url: './assets/images/background/horizontal/5.jpg'
                },
                {
                    id: 6,
                    name: 'Retro Special',
                    cover_url: './assets/images/background/horizontal/6.jpg'
                }
            ]
        };
    }
}

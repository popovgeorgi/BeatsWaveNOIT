export class GenresConfig {

    public config: any = {};

    constructor() {
        this.config = {
            items: [
                {
                    id: 1,
                    name: 'Remix Songs',
                    cover_url: './assets/images/background/horizontal/1.jpg'
                },
                {
                    id: 2,
                    name: 'Rock Songs',
                    cover_url: './assets/images/background/horizontal/2.jpg'
                },
                {
                    id: 3,
                    name: 'Sufi Songs',
                    cover_url: './assets/images/background/horizontal/3.jpg'
                },
                {
                    id: 4,
                    name: 'Romantic Songs',
                    cover_url: './assets/images/background/horizontal/4.jpg'
                },
                {
                    id: 5,
                    name: 'Sports Songs',
                    cover_url: './assets/images/background/horizontal/5.jpg'
                },
                {
                    id: 6,
                    name: 'Old Songs',
                    cover_url: './assets/images/background/horizontal/6.jpg'
                }
            ]
        };
    }
}

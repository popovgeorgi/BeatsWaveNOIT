export class GenresConfig {

    public config: any = {};

    constructor() {
        this.config = {
            items: [
                {
                    id: 1,
                    name: 'Hip-Hop',
                    cover_url: './assets/images/background/horizontal/1.jpg'
                },
                {
                    id: 2,
                    name: 'Pop',
                    cover_url: './assets/images/background/horizontal/2.jpg'
                },
                {
                    id: 3,
                    name: 'R&B',
                    cover_url: './assets/images/background/horizontal/3.jpg'
                },
                {
                    id: 4,
                    name: 'Rock',
                    cover_url: './assets/images/background/horizontal/4.jpg'
                },
                {
                    id: 5,
                    name: 'Electronic',
                    cover_url: './assets/images/background/horizontal/5.jpg'
                },
                {
                    id: 6,
                    name: 'Jazz',
                    cover_url: './assets/images/background/horizontal/6.jpg'
                },
                {
                  id: 7,
                  name: 'Reggaeton',
                  cover_url: './assets/images/background/horizontal/7.jpg'
              }
            ]
        };
    }
}

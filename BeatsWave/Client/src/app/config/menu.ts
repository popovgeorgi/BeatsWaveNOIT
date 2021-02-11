export class MenuConfig {

  public config: any = {};

  constructor() {
    this.config = {
      aside: {
        items: [
          { section: 'Browse Music' },
          {
            title: 'Home',
            icon: 'la la-home',
            page: '/home'
          },
          {
            title: 'Genres',
            icon: 'la la-diamond',
            page: '/genres'
          },
          {
            title: 'Feed',
            icon: 'la la-music',
            page: '/music'
          },
          {
            title: 'Artists',
            icon: 'la la-microphone',
            page: '/artists'
          },
          { section: 'Your Music' },
          {
            title: 'Analytics',
            icon: 'la la-bar-chart',
            page: '/analytics'
          },
          {
            title: 'Favorites',
            icon: 'la la-heart-o',
            page: '/favorites'
          },
          { section: 'Music Events' },
          {
            title: 'Events',
            icon: 'la la-calendar',
            page: '/events'
          },
          {
            title: 'Add Event',
            icon: 'la la-home',
            page: '/add-event'
          }
        ],
        guestItems: [
          { section: 'Browse Music' },
          {
            title: 'Home',
            icon: 'la la-home',
            page: '/home'
          },
          {
            title: 'Genres',
            icon: 'la la-diamond',
            page: '/genres'
          },
          {
            title: 'Feed',
            icon: 'la la-music',
            page: '/music'
          },
          {
            title: 'Artists',
            icon: 'la la-microphone',
            page: '/artists'
          },
          { section: 'Music Events' },
          {
            title: 'Events',
            icon: 'la la-calendar',
            page: '/events'
          }
        ],
        artistItems: [
          { section: 'Browse Music' },
          {
            title: 'Home',
            icon: 'la la-home',
            page: '/home'
          },
          {
            title: 'Genres',
            icon: 'la la-diamond',
            page: '/genres'
          },
          {
            title: 'Feed',
            icon: 'la la-music',
            page: '/music'
          },
          {
            title: 'Artists',
            icon: 'la la-microphone',
            page: '/artists'
          },
          { section: 'Your Music' },
          {
            title: 'Favorites',
            icon: 'la la-heart-o',
            page: '/favorites'
          },
          { section: 'Music Events' },
          {
            title: 'Events',
            icon: 'la la-calendar',
            page: '/events'
          }
        ],
        beatmakerItems: [
          { section: 'Browse Music' },
          {
            title: 'Home',
            icon: 'la la-home',
            page: '/home'
          },
          {
            title: 'Genres',
            icon: 'la la-diamond',
            page: '/genres'
          },
          {
            title: 'Feed',
            icon: 'la la-music',
            page: '/music'
          },
          {
            title: 'Artists',
            icon: 'la la-microphone',
            page: '/artists'
          },
          { section: 'Your Music' },
          {
            title: 'Analytics',
            icon: 'la la-bar-chart',
            page: '/analytics'
          },
          {
            title: 'Favorites',
            icon: 'la la-heart-o',
            page: '/favorites'
          },
          { section: 'Music Events' },
          {
            title: 'Events',
            icon: 'la la-calendar',
            page: '/events'
          }
        ],
        managerItems: [
          { section: 'Browse Music' },
          {
            title: 'Home',
            icon: 'la la-home',
            page: '/home'
          },
          {
            title: 'Genres',
            icon: 'la la-diamond',
            page: '/genres'
          },
          {
            title: 'Feed',
            icon: 'la la-music',
            page: '/music'
          },
          {
            title: 'Artists',
            icon: 'la la-microphone',
            page: '/artists'
          },
          { section: 'Your Music' },
          {
            title: 'Favorites',
            icon: 'la la-heart-o',
            page: '/favorites'
          },
          { section: 'Music Events' },
          {
            title: 'Events',
            icon: 'la la-calendar',
            page: '/events'
          },
          {
            title: 'Add Event',
            icon: 'la la-home',
            page: '/add-event'
          }
        ]
      },
      beatmakerUserMenu: {
        items: [
          {
            title: 'Profile',
            icon: 'ion-md-contact',
            page: '/profile'
          },
          {
            title: 'My Beats',
            icon: 'ion-ios-musical-notes',
            page: '/my-beats'
          },
          {
            title: 'Your Plan',
            icon: 'ion-md-radio-button-off',
            page: '/plan'
          },
          {
            title: 'Privacy',
            icon: 'ion-ios-lock',
            page: '/privacy'
          },
          {
            title: 'Settings',
            icon: 'ion-md-settings',
            page: '/settings'
          }
        ]
      },
      userMenu: {
        items: [
          {
            title: 'Profile',
            icon: 'ion-md-contact',
            page: '/profile'
          },
          {
            title: 'Your Plan',
            icon: 'ion-md-radio-button-off',
            page: '/plan'
          },
          {
            title: 'Privacy',
            icon: 'ion-ios-lock',
            page: '/privacy'
          },
          {
            title: 'Settings',
            icon: 'ion-md-settings',
            page: '/settings'
          }
        ]
      },
      managerUserMenu: {
        items: [
          {
            title: 'Profile',
            icon: 'ion-md-contact',
            page: '/profile'
          },
          {
            title: 'My Events',
            icon: 'ion-ios-arrow-dropleft',
            page: '/my-events'
          },
          {
            title: 'Your Plan',
            icon: 'ion-md-radio-button-off',
            page: '/plan'
          },
          {
            title: 'Privacy',
            icon: 'ion-ios-lock',
            page: '/privacy'
          },
          {
            title: 'Settings',
            icon: 'ion-md-settings',
            page: '/settings'
          }
        ]
      }
    };
  }
}

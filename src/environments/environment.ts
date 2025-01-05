// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_KEY: 'f7072d6c4517f67b3ec70ac53aadcb7e',
  BASE_URL: 'https://api.themoviedb.org/3',
  LANGUAGE: "en",
  URL_IMAGES: {
    POSTER: 'https://image.tmdb.org/t/p/w500',
    BACKDROP: 'https://image.tmdb.org/t/p/w780',
    BANNER: 'https://image.tmdb.org/t/p/original',
    PROFILE: 'https://image.tmdb.org/t/p/h632',
    LOGO: 'https://image.tmdb.org/t/p/w500',
  },
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
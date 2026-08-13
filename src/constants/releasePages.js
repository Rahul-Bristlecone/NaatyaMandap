export const RELEASE_PAGE_KEYS = {
  THEATRE: 'theatre',
  OTT_MOVIES: 'ottMovies',
  OTT_SERIES: 'ottSeries',
}

export const RELEASE_PAGE_CONFIG = {
  [RELEASE_PAGE_KEYS.THEATRE]: {
    configKey: 'theatreReleases',
    title: 'Bollywood Releases - Theatrical',
    intro: 'Tracked by release windows and monthly filters.',
    themeColor: '#d4c9ba',
  },
  [RELEASE_PAGE_KEYS.OTT_MOVIES]: {
    configKey: 'ottMovieReleases',
    title: 'Bollywood Releases - Digital',
    intro: 'Upcoming direct-to-digital and post-theatrical digital movie releases.',
    themeColor: '#c0caac',
  },
  [RELEASE_PAGE_KEYS.OTT_SERIES]: {
    configKey: 'ottWebSeries',
    title: 'Web Series - Digital',
    intro: 'Tracked by platform, release date, and season details.',
    themeColor: '#c1c9de',
  },
}

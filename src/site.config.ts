// Everything you might change by hand lives here.
const github = 'https://github.com/arpitagarwal1301/youtube-summary';

export const site = {
  name: 'Know It',
  fullName: 'Know It for YouTube',
  url: 'https://getknowit.github.io',
  /** The extension's public repo: changelog, privacy policy and releases are read from it at build time. */
  repo: 'arpitagarwal1301/youtube-summary',
  author: 'Arpit Agarwal',
  tagline: 'Know the answer before you click.',
  description:
    'A free Chrome extension that answers clickbait YouTube titles. Hover a video, press Know it, and see the film, the stock or the price the title is hiding.',

  /** Chrome Web Store. Set `url` once the listing is live; `users` and `rating` once it shows them. */
  store: {
    url: 'https://chromewebstore.google.com/detail/know-it-for-youtube/nilkfcjmledjkedlljnggfohkpbibigc' as string | null,
    users: 0,
    rating: null as number | null,
  },

  /** The hero demo. Set `youtubeId` to swap the looping clip for a click-to-play YouTube video. */
  demo: {
    youtubeId: null as string | null,
    /** One clip per site theme: the page plays the one that matches. */
    video: { light: '/demo/demo-light.webm', dark: '/demo/demo-dark.webm' },
    poster: { light: '/demo/poster-light.jpg', dark: '/demo/poster-dark.jpg' },
  },

  links: {
    github,
    releases: `${github}/releases`,
    zip: `${github}/releases/latest/download/know-it.zip`,
    issues: `${github}/issues/new/choose`,
    discussions: `${github}/discussions`,
    license: `${github}/blob/main/LICENSE`,
    sponsor: 'https://github.com/sponsors/arpitagarwal1301',
    email: 'mailto:arpitvinshu@gmail.com?subject=Know%20It',
    getKey: 'https://aistudio.google.com/apikey',
    billing: 'https://aistudio.google.com/usage',
  },
};

/** Where every "Install on Chrome" button goes. */
export const installHref = site.store.url ?? '/#install';

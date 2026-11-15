# Know It website

The website for [Know It for YouTube](https://github.com/arpitagarwal1301/youtube-summary), the Chrome extension that answers clickbait YouTube titles. Live at **https://getknowit.github.io**.

Static [Astro](https://astro.build) site on GitHub Pages. No analytics, no cookies, and nothing loads from another site until a visitor presses play on a YouTube video.

## Run it

Needs Node 22.23.4 or newer.

```sh
npm install
npm run dev      # http://localhost:4321
npm run check    # build, then check links and link previews
```

Pushing to `main` deploys. The site also rebuilds daily, so new releases, changelog edits and download counts show up on their own.

## What comes from where

| On the site | Source |
|---|---|
| `/changelog` | `CHANGELOG.md` in the extension repo, read at build time |
| `/privacy` | `store/privacy-policy.md` in the extension repo, read at build time |
| Version, download count | GitHub releases of the extension repo |
| Store link, rating, users, demo video | `src/site.config.ts` |
| "Titles, answered" wall | `src/data/titles.json`: real answers from the extension |
| Quote cards | `src/data/sayings.json` |
| FAQ | `src/data/faq.ts` |

Never edit the changelog or privacy policy here. Change them in the extension repo.

## Common changes

- **The extension is on the Chrome Web Store:** set `store.url` in `src/site.config.ts`. Every "Install on Chrome" button then goes there, and the install section opens on the store tab. Add `store.users` and `store.rating` once the listing shows them.
- **You recorded a how-to video:** upload it to YouTube and set `demo.youtubeId`. The hero then shows a click-to-play video. The YouTube player only loads after the click.
- **Someone said something nice:** add `{ "name", "role", "text", "avatar" }` to `quotes` in `src/data/sayings.json`, with their permission. Each real quote replaces one of the "Things you'll stop saying" cards. With 3 or more, the section is titled "What people say". Only use real quotes from real people.
- **Download count:** the badge in the hero adds up GitHub release downloads and `store.users`, rounded down to a milestone (10+, 25+, 50+…). It appears by itself once the real total reaches 10.

## Demo video and images

- `public/demo/demo.webm`: a 12-second clip of the real extension on YouTube, recorded with Playwright and cropped. The wait for Gemini is shortened, as the caption says.
- `public/og.png`: the 1200×630 link preview. Keep it under 300 KB, or WhatsApp won't show it.
- `public/thumbs/`: video thumbnails, kept here so the page makes no requests to YouTube.

## How-to video script (about 60 seconds)

1. **0–5 s:** A clickbait title on YouTube. "You've seen titles like this."
2. **5–15 s:** Install from the Chrome Web Store. Pin Know It.
3. **15–30 s:** Press Know it, follow the two steps to get a free key in Google AI Studio, and paste it in.
4. **30–45 s:** Hover three thumbnails and press Know it on each. Keep scrolling while they load.
5. **45–55 s:** Open an answer. Point at the highlighted words and the timestamp.
6. **55–60 s:** "Know the answer before you click." Show the site URL.

Record at 1920×1080 with a large cursor, YouTube in light mode, and no sound needed. Captions burned in help, since most people watch muted.

## License

The content and code of this site are © Arpit Agarwal. Know It itself is under the [PolyForm Noncommercial License 1.0.0](https://github.com/arpitagarwal1301/youtube-summary/blob/main/LICENSE).

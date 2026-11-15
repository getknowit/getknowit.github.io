import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served from https://getknowit.github.io (GitHub Pages, org site).
// For a custom domain later: change `site` here and in src/site.config.ts, and add public/CNAME.
export default defineConfig({
  site: 'https://getknowit.github.io',
  trailingSlash: 'never',
  build: { format: 'file' },
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});

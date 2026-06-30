import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

// Site URL is used for canonical links + sitemap generation.
// Custom domain (apex) served via GitHub Pages — site is served at the root.
export default defineConfig({
  site: 'https://unesco-schule-essen.de',
  base: '/',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [sitemap(), pagefind()],
});

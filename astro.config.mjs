import { defineConfig } from 'astro/config';

// Site URL is used for canonical links + sitemap generation.
// Custom domain served via GitHub Pages (apex or www — update once DNS is final).
export default defineConfig({
  site: 'https://tobiaskammer-de.github.io',
  base: '/unesco-schule-essen-homepage',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});

import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cd-aied.github.io',
  base: '/website',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: true,
    },
  },
});

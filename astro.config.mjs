import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
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

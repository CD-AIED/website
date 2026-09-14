import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://cd-aied.github.io',
  base: '/website',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: true,
    },
  },
});

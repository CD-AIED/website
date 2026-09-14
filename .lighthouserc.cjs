module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --host 127.0.0.1 --port 4321',
      startServerReadyPattern: 'Local',
      startServerReadyTimeout: 15000,
      url: [
        'http://127.0.0.1:4321/website/',
        'http://127.0.0.1:4321/website/team/',
        'http://127.0.0.1:4321/website/articles/first-note/',
        'http://127.0.0.1:4321/website/researchers/oreoezi/',
      ],
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

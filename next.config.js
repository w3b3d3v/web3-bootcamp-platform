const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  i18n: {
    locales: ['en', 'pt-BR'],
    defaultLocale: 'en',
    localeDetection: true, // Turn off automatic locale detection
  },
  images: {
    domains: [
      'assets.zipschool.com',
      'cdn.buildspace.so',
      'firebasestorage.googleapis.com',
      'localhost',
    ],
  },
});

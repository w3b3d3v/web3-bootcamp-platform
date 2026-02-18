/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://build.w3d.community',
  generateRobotsTxt: false, // We manage robots.txt manually in public/
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude private/non-indexable routes
  exclude: [
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/auth',
    '/auth/*',
    '/profile',
    '/profile/*',
    '/404',
  ],

  // Custom priority and changefreq per route
  transform: async (config, path) => {
    let priority = 0.7
    let changefreq = 'weekly'

    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path === '/courses') {
      priority = 0.9
      changefreq = 'daily'
    } else if (path.startsWith('/courses/') && path.split('/').length === 3) {
      // Individual course pages: /courses/[id]
      priority = 0.8
      changefreq = 'monthly'
    } else if (path === '/faq') {
      priority = 0.7
      changefreq = 'monthly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}

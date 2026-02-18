import Head from 'next/head'

/**
 * SEOHead - Reusable SEO component for Next.js pages
 *
 * @param {string} title - Page title (branding suffix added automatically)
 * @param {string} description - Meta description (150-160 chars recommended)
 * @param {string} [canonical] - Relative path for canonical URL (e.g., "/courses/solidity")
 * @param {string[]} [keywords] - Array of keywords
 * @param {'website'|'article'|'profile'} [ogType] - Open Graph type
 * @param {string} [ogImage] - Absolute URL to OG image (1200x630px recommended)
 * @param {string} [ogImageAlt] - Alt text for OG image
 * @param {number} [ogImageWidth] - OG image width (default: 1200)
 * @param {number} [ogImageHeight] - OG image height (default: 630)
 * @param {'summary'|'summary_large_image'} [twitterCard] - Twitter card type
 * @param {string} [twitterSite] - Twitter handle for the site
 * @param {string} [twitterCreator] - Twitter handle for content creator
 * @param {object|object[]} [jsonLd] - JSON-LD structured data (single or array)
 * @param {boolean} [noindex] - Prevent search engine indexing
 * @param {boolean} [nofollow] - Prevent following links
 * @param {string} [locale] - Content locale (default: 'pt-BR')
 */
export default function SEOHead({
  title,
  description,
  canonical,
  keywords = [],
  ogType = 'website',
  ogImage,
  ogImageAlt,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  twitterCard = 'summary_large_image',
  twitterSite = '@web3dev_',
  twitterCreator,
  jsonLd,
  noindex = false,
  nofollow = false,
  locale = 'pt-BR',
}) {
  const siteUrl = 'https://build.w3d.community'

  // Build canonical URL (absolute)
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined

  // Auto-append branding if not already present
  const fullTitle = title && title.includes('WEB3DEV') ? title : `${title} | WEB3DEV Bootcamp`

  // Robots directive (only emit tag when restricting)
  const robotsContent =
    noindex || nofollow
      ? `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`
      : null

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Robots */}
      {robotsContent && <meta name="robots" content={robotsContent} />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="WEB3DEV Bootcamp" />
      <meta property="og:locale" content={locale} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
          <meta property="og:image:width" content={String(ogImageWidth)} />
          <meta property="og:image:height" content={String(ogImageHeight)} />
          <meta property="og:image:type" content="image/png" />
        </>
      )}

      {/* Twitter Card */}
      <meta property="twitter:card" content={twitterCard} />
      {canonicalUrl && <meta property="twitter:url" content={canonicalUrl} />}
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      {ogImage && <meta property="twitter:image" content={ogImage} />}
      {twitterSite && <meta property="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta property="twitter:creator" content={twitterCreator} />}

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd], null, 2),
          }}
        />
      )}
    </Head>
  )
}

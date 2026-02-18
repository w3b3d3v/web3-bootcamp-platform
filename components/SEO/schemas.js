const SITE_URL = 'https://build.w3d.community'

/**
 * Build Organization Schema (schema.org/Organization)
 * Use on homepage and any page representing WEB3DEV as a brand.
 *
 * @returns {Object} JSON-LD Organization schema
 */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WEB3DEV',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/img/web3dev-logo.png`,
    sameAs: [
      'https://github.com/w3b3d3v',
      'https://twitter.com/web3dev_',
      'https://discord.w3d.community',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://discord.w3d.community',
    },
  }
}

/**
 * Build Course Schema (schema.org/Course)
 * Use on individual course pages.
 *
 * @param {Object} course - Course data object from Firebase
 * @param {string} course.id - Course ID (used for URL)
 * @param {string} course.name - Course name
 * @param {string} course.description - Course description
 * @param {string} [course.image_url] - Course image URL
 * @param {string} [course.level] - Skill level (e.g., 'Beginner')
 * @param {string[]} [course.tags] - Array of topic tags
 * @param {string} [course.duration] - ISO 8601 duration (e.g., 'P10D' = 10 days)
 * @param {boolean} [course.hasCertificate] - Whether course grants NFT certificate
 * @param {string} [course.language] - Content language (default: 'pt-BR')
 * @returns {Object} JSON-LD Course schema
 */
export function buildCourseSchema(course) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    url: `${SITE_URL}/courses/${course.id}`,

    // Provider
    provider: {
      '@type': 'Organization',
      name: 'WEB3DEV',
      url: SITE_URL,
    },

    // Course details
    courseCode: course.id,
    educationalLevel: course.level || 'Beginner',
    teaches: course.tags || [],
    inLanguage: course.language || 'pt-BR',

    // Image
    image: course.image_url || `${SITE_URL}/og/og-course-default.png`,

    // Free offer
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      category: 'Free',
      availability: 'https://schema.org/InStock',
    },

    // Duration (if available)
    ...(course.duration && { timeRequired: course.duration }),

    // NFT Certificate credential
    educationalCredentialAwarded: {
      '@type': 'EducationalOccupationalCredential',
      name: `${course.name} Completion Certificate`,
      description: 'NFT-based completion certificate on the Ethereum blockchain',
      credentialCategory: 'certificate',
    },
  }
}

/**
 * Build BreadcrumbList Schema (schema.org/BreadcrumbList)
 * Use on all pages to show navigation hierarchy.
 *
 * @param {Array<{name: string, url: string}>} items - Breadcrumb items in order
 * @returns {Object} JSON-LD BreadcrumbList schema
 *
 * @example
 * buildBreadcrumbSchema([
 *   { name: 'Home', url: 'https://build.w3d.community' },
 *   { name: 'Courses', url: 'https://build.w3d.community/courses' },
 *   { name: 'Solidity', url: 'https://build.w3d.community/courses/solidity-101' },
 * ])
 */
export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Build FAQPage Schema (schema.org/FAQPage)
 * Use on the /faq page. Supports both flat arrays and
 * categorized structures (array of { category, questions[] }).
 *
 * @param {Array} faqData - Either flat [{question, answer}] or
 *   categorized [{category, questions: [{question, answer}]}]
 * @returns {Object} JSON-LD FAQPage schema
 */
export function buildFAQSchema(faqData) {
  // Support both flat and categorized FAQ data structures
  const allQuestions = faqData[0]?.questions
    ? faqData.flatMap((section) => section.questions)
    : faqData

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allQuestions.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        // Strip any HTML tags so schema text is clean
        text: faq.answer.replace(/<[^>]*>/g, ''),
      },
    })),
  }
}

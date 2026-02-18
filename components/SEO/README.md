# SEO Component

Reusable SEO component for the Web3 Bootcamp Platform. Handles all meta tags, Open Graph, Twitter Cards, canonical URLs, and JSON-LD structured data.

## Files

| File | Purpose |
|---|---|
| `SEOHead.js` | Main component wrapping Next.js `<Head>` |
| `schemas.js` | JSON-LD schema builder functions |
| `index.js` | Barrel export |

---

## Basic Usage

```jsx
import SEOHead from '../components/SEO'

export default function MyPage() {
  return (
    <>
      <SEOHead
        title="My Page Title"
        description="A clear description of this page, ideally 150-160 characters long."
        canonical="/my-page"
      />
      {/* page content */}
    </>
  )
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | **required** | Page title. `" \| WEB3DEV Bootcamp"` appended automatically unless already present. |
| `description` | `string` | **required** | Meta description. Keep to 150-160 characters. |
| `canonical` | `string` | `undefined` | Relative path (e.g. `/courses/solidity`). Domain prepended from `NEXT_PUBLIC_SITE_URL`. |
| `keywords` | `string[]` | `[]` | Array of keywords. Omit or keep minimal — not a ranking factor. |
| `ogType` | `string` | `'website'` | Open Graph type: `'website'`, `'article'`, or `'profile'`. |
| `ogImage` | `string` | `undefined` | Absolute URL to OG image (1200×630px). |
| `ogImageAlt` | `string` | `undefined` | Alt text for OG image. |
| `ogImageWidth` | `number` | `1200` | OG image width in px. |
| `ogImageHeight` | `number` | `630` | OG image height in px. |
| `twitterCard` | `string` | `'summary_large_image'` | Twitter card type. |
| `twitterSite` | `string` | `'@web3dev_'` | Twitter handle for the site. |
| `twitterCreator` | `string` | `undefined` | Twitter handle for the content author. |
| `jsonLd` | `object\|object[]` | `undefined` | JSON-LD schema object or array of schemas. |
| `noindex` | `boolean` | `false` | Set `true` for private/auth pages. |
| `nofollow` | `boolean` | `false` | Set `true` to block link following. |
| `locale` | `string` | `'pt-BR'` | OG locale. |

---

## Schema Builders

Import from `components/SEO/schemas` (or via the index barrel):

```js
import {
  buildOrganizationSchema,
  buildCourseSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from '../components/SEO/schemas'
```

### `buildOrganizationSchema()`

Use on the **homepage**. No arguments.

```jsx
<SEOHead
  title="Web3 Bootcamp"
  description="..."
  canonical="/"
  jsonLd={buildOrganizationSchema()}
/>
```

---

### `buildCourseSchema(course)`

Use on **individual course pages**. Accepts the course object from Firebase.

```jsx
const schema = buildCourseSchema({
  id: 'solidity-101',
  name: 'Solidity Smart Contract Development',
  description: 'Learn to build smart contracts...',
  image_url: 'https://...',
  level: 'Beginner',
  tags: ['Solidity', 'Ethereum', 'Smart Contracts'],
})
```

---

### `buildBreadcrumbSchema(items)`

Use on **all pages** to show navigation hierarchy.

```jsx
const schema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://build.w3d.community' },
  { name: 'Courses', url: 'https://build.w3d.community/courses' },
  { name: 'Solidity 101', url: 'https://build.w3d.community/courses/solidity-101' },
])
```

---

### `buildFAQSchema(faqData)`

Use on the **/faq page**. Accepts flat or categorized FAQ data.

```jsx
// Flat
const schema = buildFAQSchema([
  { question: 'Is it free?', answer: 'Yes, completely free.' },
])

// Categorized (from data/faq.js)
const schema = buildFAQSchema(faqData) // faqData = [{ category, questions[] }]
```

---

## Course Page Example (Multiple Schemas)

```jsx
import SEOHead from '../../components/SEO'
import { buildCourseSchema, buildBreadcrumbSchema } from '../../components/SEO/schemas'

export default function CoursePage({ course }) {
  const schemas = [
    buildCourseSchema(course),
    buildBreadcrumbSchema([
      { name: 'Home', url: 'https://build.w3d.community' },
      { name: 'Courses', url: 'https://build.w3d.community/courses' },
      { name: course.name, url: `https://build.w3d.community/courses/${course.id}` },
    ]),
  ]

  return (
    <>
      <SEOHead
        title={course.name}
        description={course.description}
        canonical={`/courses/${course.id}`}
        ogType="article"
        ogImage={course.image_url}
        ogImageAlt={`${course.name} - WEB3DEV Bootcamp`}
        jsonLd={schemas}
      />
      {/* course content */}
    </>
  )
}
```

---

## Environment Variable

Add to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://build.w3d.community
```

Falls back to `https://build.w3d.community` if not set.

---

## Schema Validation

After implementing on any page, validate at:
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Schema.org Validator:** https://validator.schema.org/
- **Facebook OG Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator

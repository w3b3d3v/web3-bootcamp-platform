# Epic SEO-001: SEO & AEO Enhancement - Stories Overview

**Project:** Web3 Bootcamp Platform
**Epic:** SEO-001
**Approach:** Lightweight Implementation
**Total Estimated Effort:** 4-5 days

---

## 📋 Epic Summary

This epic implements comprehensive SEO and Answer Engine Optimization (AEO) for the Web3 Bootcamp Platform using a pragmatic, lightweight approach focused on maximum impact with minimal complexity.

**Primary Goals:**
- 🎯 Increase organic search traffic by 30% within 3 months
- 🤖 Make platform discoverable by AI assistants (ChatGPT, Claude, Perplexity)
- ⭐ Enable rich results in Google Search
- 🔍 Improve discoverability for Web3 education content

---

## 📚 Stories Overview

### ✅ Story SEO-001.1: SEO Component Infrastructure
**Priority:** Critical | **Effort:** 1 day | **Status:** Ready

Create reusable `SEOHead` component for Next.js pages with support for:
- Dynamic meta tags (title, description, canonical URL)
- Open Graph and Twitter Card tags
- JSON-LD structured data injection
- Schema builders for common patterns (Course, FAQ, Breadcrumb, Organization)

**Deliverables:**
- `components/SEO/SEOHead.js` - Main component
- `components/SEO/schemas.js` - Schema builder functions
- `components/SEO/README.md` - Usage documentation

**Dependencies:** None

---

### ✅ Story SEO-001.2: Static SEO Files
**Priority:** Critical | **Effort:** 0.5 days | **Status:** Ready

Create essential static files for search engines and AI crawlers:
- `llm.txt` - AI crawler configuration file with platform overview
- `robots.txt` - Enhanced with AI crawler permissions (GPTBot, ClaudeBot, etc.)
- `sitemap.xml` - Dynamic sitemap generation (using next-sitemap or manual)

**Deliverables:**
- `public/llm.txt`
- `public/robots.txt`
- `next-sitemap.config.js` or `pages/api/sitemap.xml.js`

**Dependencies:** SEO-001.1 (for NEXT_PUBLIC_SITE_URL env var)

---

### ✅ Story SEO-001.3: Course Structured Data
**Priority:** High | **Effort:** 1 day | **Status:** Ready

Implement structured data (JSON-LD) on all key pages:
- **Course pages:** Course schema with provider, level, duration, NFT certificates
- **Homepage:** Organization schema for WEB3DEV
- **Courses listing:** Breadcrumb schema
- **All pages:** Breadcrumb navigation for SEO

**Deliverables:**
- Enhanced course pages with structured data
- Updated homepage with organization info
- Breadcrumb schemas across navigation

**Dependencies:** SEO-001.1 (schema builders)

---

### ✅ Story SEO-001.4: Page Meta Enhancement
**Priority:** High | **Effort:** 1 day | **Status:** Ready

Enhance meta tags across all pages:
- Add canonical URLs to prevent duplicate content
- Optimize meta descriptions (150-160 chars, keyword-rich)
- Create Open Graph images (1200x630px)
- Implement consistent title templates
- Enhance social media previews

**Deliverables:**
- Canonical URLs on all pages
- SEO-optimized meta descriptions
- OG images: og-home.png, og-course-default.png, og-courses.png
- Enhanced social sharing

**Dependencies:** SEO-001.1 (SEOHead component)

---

### ✅ Story SEO-001.5: FAQ Page Implementation
**Priority:** Medium (Optional - High Impact) | **Effort:** 1 day | **Status:** Ready

Create comprehensive FAQ page optimized for AI extraction:
- Standalone FAQ page at `/faq`
- FAQPage schema (JSON-LD) with 15+ Q&A pairs
- Questions optimized for conversational search
- Answers 150-300 words (optimal for AI)
- Categories: Getting Started, NFT Certificates, Learning, Technical, After Completion

**Deliverables:**
- `pages/faq.js`
- `data/faq.js` with comprehensive Q&A content
- FAQ link in main navigation

**Dependencies:** SEO-001.1 (buildFAQSchema helper)

---

## 🗂️ File Structure

```
web3-bootcamp-platform/
├── components/
│   └── SEO/
│       ├── SEOHead.js              # Story SEO-001.1
│       ├── schemas.js              # Story SEO-001.1
│       ├── index.js                # Story SEO-001.1
│       └── README.md               # Story SEO-001.1
├── data/
│   └── faq.js                      # Story SEO-001.5
├── pages/
│   ├── index.js                    # Enhanced in SEO-001.3, SEO-001.4
│   ├── faq.js                      # Story SEO-001.5
│   ├── courses/
│   │   ├── index.js                # Enhanced in SEO-001.3, SEO-001.4
│   │   └── [id].js                 # Enhanced in SEO-001.3, SEO-001.4
│   └── profile/
│       └── index.js                # Enhanced in SEO-001.4
├── public/
│   ├── llm.txt                     # Story SEO-001.2
│   ├── robots.txt                  # Story SEO-001.2
│   ├── sitemap.xml                 # Story SEO-001.2 (generated)
│   └── og/
│       ├── og-home.png             # Story SEO-001.4
│       ├── og-course-default.png   # Story SEO-001.4
│       ├── og-courses.png          # Story SEO-001.4
│       └── og-profile.png          # Story SEO-001.4
├── next-sitemap.config.js          # Story SEO-001.2 (Option A)
└── .env.local
    └── NEXT_PUBLIC_SITE_URL        # Story SEO-001.1
```

---

## 🚀 Implementation Sequence

### Phase 1: Foundation (Days 1-2)
**Stories:** SEO-001.1, SEO-001.2

1. Create SEO component infrastructure
2. Implement schema builder functions
3. Create llm.txt with platform overview
4. Configure robots.txt with AI crawler permissions
5. Set up sitemap generation (next-sitemap recommended)
6. Test component integration on one test page

**Validation:**
- SEOHead component renders correctly
- llm.txt accessible at `/llm.txt`
- robots.txt accessible at `/robots.txt`
- Sitemap generates at build time

---

### Phase 2: Content Enhancement (Days 3-4)
**Stories:** SEO-001.3, SEO-001.4

1. Add structured data to all course pages
2. Add Organization schema to homepage
3. Implement breadcrumb schemas
4. Create Open Graph images (1200x630px)
5. Enhance meta descriptions across all pages
6. Add canonical URLs to all pages
7. Test with Google Rich Results Test

**Validation:**
- All schemas validate with no errors
- Rich results detected for courses
- OG images display correctly in social media debuggers
- All pages have unique titles and descriptions

---

### Phase 3: FAQ & Monitoring (Day 5)
**Stories:** SEO-001.5

1. Create FAQ page with comprehensive content
2. Implement FAQPage schema
3. Add FAQ link to navigation
4. Submit sitemap to Google Search Console
5. Test AI assistant discoverability
6. Monitor indexing and rich results

**Validation:**
- FAQ schema validates
- FAQ appears in "People Also Ask"
- AI assistants can extract Q&A correctly
- Google Search Console shows no errors

---

## ✅ Success Criteria

### Must Have (All Complete = Epic Done)

- [ ] SEOHead component created and used on all pages
- [ ] llm.txt, robots.txt, sitemap.xml deployed and accessible
- [ ] All course pages include Course schema
- [ ] All pages have canonical URLs
- [ ] All meta descriptions optimized (150-160 chars)
- [ ] All schemas validated with no errors
- [ ] Platform appears in AI assistant responses
- [ ] Google Search Console configured and monitoring

### Nice to Have

- [ ] FAQ page implemented with schema
- [ ] Rich results appearing in Google SERP
- [ ] 10+ high-quality FAQ items
- [ ] Analytics tracking FAQ views
- [ ] Accordion UI for FAQ (optional enhancement)

---

## 📊 Validation Checklist

### Schema Validation
- [ ] All JSON-LD schemas validate at https://search.google.com/test/rich-results
- [ ] All schemas validate at https://validator.schema.org/
- [ ] No critical errors in Google Search Console
- [ ] Rich results preview shows correctly

### File Accessibility
- [ ] llm.txt accessible at `https://build.w3d.community/llm.txt`
- [ ] robots.txt accessible at `https://build.w3d.community/robots.txt`
- [ ] sitemap.xml accessible at `https://build.w3d.community/sitemap.xml`
- [ ] All files return correct content-type headers

### AI Readability
- [ ] Test queries in ChatGPT return platform info
- [ ] Test queries in Claude return platform info
- [ ] Platform appears in Perplexity search results
- [ ] llm.txt content is accurate and comprehensive

### SEO Fundamentals
- [ ] All pages have unique, descriptive titles (<60 chars)
- [ ] All pages have unique meta descriptions (150-160 chars)
- [ ] All pages have canonical URLs
- [ ] All pages have appropriate OG images (1200x630px)
- [ ] All images have alt text

### Social Media
- [ ] OG tags validated with Facebook Debugger
- [ ] Twitter Cards validated with Twitter Card Validator
- [ ] LinkedIn previews display correctly
- [ ] All social previews show correct title, description, image

---

## 📖 Related Documentation

- **Epic:** `docs/internal/epic-seo-enhancement.md`
- **AEO Checklist:** `.bmad-core/checklists/aeo-optimization.md`
- **Reference Platform:** `/web3dev/forem-articles/static-articles/README.md`
- **Architecture:** `docs/internal/architecture.md` (to be updated post-implementation)

---

## 🧪 Testing Resources

### Schema Validation
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Structured Data Testing Tool (deprecated but useful): https://search.google.com/structured-data/testing-tool

### Social Media Debuggers
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### Sitemap Validation
- XML Sitemap Validator: https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Google Search Console: https://search.google.com/search-console

### AI Crawler Documentation
- OpenAI GPTBot: https://platform.openai.com/docs/gptbot
- Anthropic ClaudeBot: https://support.anthropic.com/en/articles/8896518
- Google-Extended: https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers

---

## 🎯 Timeline & Effort

| Story | Priority | Effort | Dependencies | Start After |
|-------|----------|--------|--------------|-------------|
| SEO-001.1 | Critical | 1 day | None | Immediately |
| SEO-001.2 | Critical | 0.5 days | SEO-001.1 | Day 1 afternoon |
| SEO-001.3 | High | 1 day | SEO-001.1 | Day 2 |
| SEO-001.4 | High | 1 day | SEO-001.1 | Day 3 |
| SEO-001.5 | Medium | 1 day | SEO-001.1 | Day 4 (optional) |

**Total:** 4-5 days (depending on FAQ implementation)

---

## 🚦 Story Status Tracking

| Story ID | Title | Status | Assigned To | Completed |
|----------|-------|--------|-------------|-----------|
| SEO-001.1 | SEO Component Infrastructure | Done | BMad | ✅ |
| SEO-001.2 | Static SEO Files | Done | BMad | ✅ |
| SEO-001.3 | Course Structured Data | Done | BMad | ✅ |
| SEO-001.4 | Page Meta Enhancement | Done | BMad | ✅ |
| SEO-001.5 | FAQ Page (Optional) | Done | BMad | ✅ |

---

## 💡 Tips for Implementation

### Developer Tips
1. **Start with SEO-001.1** - Everything else depends on the SEOHead component
2. **Test incrementally** - Validate each schema as you implement
3. **Use examples** - Each story has working code examples
4. **Measure impact** - Set up Search Console before starting

### SEO Best Practices
1. **Unique content** - Every page needs unique title and description
2. **Natural language** - Write for humans, optimize for AI
3. **Answer-first** - Put direct answers at the top of content
4. **Keep it simple** - Don't over-optimize or keyword-stuff

### Common Pitfalls
- ❌ Forgetting to set NEXT_PUBLIC_SITE_URL env var
- ❌ Using relative URLs in canonical links (component handles this)
- ❌ Meta descriptions too long (>160 chars get truncated)
- ❌ Missing alt text on OG images
- ❌ Not testing schemas before deploying

---

## 📞 Support

**Questions?**
- Review individual story documentation
- Check AEO checklist: `.bmad-core/checklists/aeo-optimization.md`
- Reference articles platform: `/web3dev/forem-articles/static-articles/`

**Issues?**
- Validate schemas with Google tools first
- Check browser console for errors
- View page source to inspect meta tags
- Test llm.txt/robots.txt accessibility

---

**Created:** 2026-02-16
**Last Updated:** 2026-02-16
**Epic:** SEO-001
**Total Stories:** 5 (4 required, 1 optional)

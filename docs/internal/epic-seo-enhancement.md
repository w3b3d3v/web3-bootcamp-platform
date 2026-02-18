# Epic: SEO & AEO Enhancement - Lightweight Implementation

**Epic ID:** SEO-001
**Project:** Web3 Bootcamp Platform
**Type:** Enhancement (Brownfield)
**Priority:** High
**Estimated Effort:** 3-5 days
**Status:** Draft

---

## Overview

Enhance the Web3 Bootcamp Platform with comprehensive SEO and Answer Engine Optimization (AEO) to improve discoverability by both traditional search engines and AI-powered answer engines (ChatGPT, Claude, Perplexity, SearchGPT, Gemini).

This epic implements a **lightweight, pragmatic approach** focused on maximum impact with minimal complexity.

---

## Business Value

### Primary Goals
1. **Increase Organic Traffic** - Improve search engine rankings for key course topics
2. **AI Discoverability** - Make platform content accessible to AI assistants for citations and recommendations
3. **Brand Authority** - Establish platform as authoritative source for Web3 education
4. **User Acquisition** - Drive more students to courses through improved SEO

### Success Metrics
- 30% increase in organic search traffic within 3 months
- Platform appears in AI assistant responses for relevant queries
- Improved Google Search Console metrics (impressions, CTR, average position)
- Rich results appearing in Google SERP

---

## Target Quality: Articles Platform SEO

We're adopting the SEO quality standards from the Web3Dev Articles platform (`/web3dev/forem-articles/static-articles`), which includes:

**Current Best Practices:**
- ✅ Complete meta tags (title, description, canonical URLs)
- ✅ Open Graph tags with proper dimensions
- ✅ Twitter Card metadata
- ✅ Structured data (JSON-LD with Article/Person/Organization schemas)
- ✅ Semantic HTML with microdata
- ✅ XML sitemap
- ✅ robots.txt
- ✅ Mobile-first viewport

**Adding AEO Best Practices:**
- 🆕 `llm.txt` for AI crawler configuration
- 🆕 AI crawler permissions in robots.txt (GPTBot, ClaudeBot, etc.)
- 🆕 FAQ schema for course information
- 🆕 HowTo schema for tutorial content
- 🆕 Enhanced structured data for courses

---

## Technical Approach

### Architecture Decision: Lightweight Implementation

**Rationale:**
- Next.js platform already has basic meta tags
- Avoid over-engineering - focus on high-impact changes
- Reusable component pattern fits Next.js architecture
- Static file generation compatible with existing build process

**Core Components:**
1. **SEO Component** - Reusable Next.js component for meta tags
2. **Static Files** - llm.txt, enhanced robots.txt, sitemap.xml
3. **Structured Data** - JSON-LD schemas for courses, FAQs, organization
4. **Meta Enhancement** - Canonical URLs, enhanced descriptions

---

## User Stories

### Story SEO-001.1: SEO Component Infrastructure
**Priority:** Critical
**Effort:** 1 day

Create reusable SEO component for Next.js pages with support for:
- Dynamic meta tags (title, description, canonical URL)
- Open Graph and Twitter Card tags
- JSON-LD structured data injection
- Default fallbacks for required fields

**Acceptance Criteria:**
- Component accepts props for all SEO fields
- Component integrates with Next.js Head
- Component includes TypeScript types
- Documentation includes usage examples

---

### Story SEO-001.2: Static SEO Files
**Priority:** Critical
**Effort:** 0.5 days

Create and configure static SEO files:
- `llm.txt` - AI crawler configuration
- `robots.txt` - Enhanced with AI crawler permissions
- `sitemap.xml` - Dynamic sitemap generation

**Acceptance Criteria:**
- llm.txt includes platform overview and key resources
- robots.txt allows GPTBot, ClaudeBot, Google-Extended, PerplexityBot
- Sitemap includes all public pages (courses, home, profiles)
- Sitemap includes lastmod dates and priorities

---

### Story SEO-001.3: Course Structured Data
**Priority:** High
**Effort:** 1 day

Implement structured data (JSON-LD) for course pages:
- Course schema with name, description, provider
- Person schema for instructors/authors
- Organization schema for Web3Dev
- HowTo schema for tutorial-based courses

**Acceptance Criteria:**
- All course pages include Course schema
- Schema validated with Google Rich Results Test
- Schema includes course duration, skill level, price
- Breadcrumb schema shows navigation hierarchy

---

### Story SEO-001.4: Page Meta Enhancement
**Priority:** High
**Effort:** 1 day

Enhance meta tags across all pages:
- Add canonical URLs to all pages
- Improve meta descriptions (150-160 chars, keyword-optimized)
- Add og:image for all courses
- Implement dynamic title templates

**Acceptance Criteria:**
- All pages have unique, descriptive titles
- All pages have canonical URLs
- Meta descriptions optimized for search and AI
- Open Graph images meet size requirements (1200x630)

---

### Story SEO-001.5: FAQ Implementation (Optional - High Impact)
**Priority:** Medium
**Effort:** 1 day

Create FAQ page or sections with structured data:
- Standalone FAQ page for common questions
- FAQPage schema (JSON-LD)
- Questions optimized for conversational search
- Answers 150-300 words for AI extraction

**Acceptance Criteria:**
- FAQ page exists at /faq
- FAQPage schema implemented and validated
- Minimum 10 high-quality Q&A pairs
- Questions based on actual user queries/support tickets

---

## Implementation Sequence

### Phase 1: Foundation (Stories 1-2)
1. Create SEO component infrastructure
2. Generate static files (llm.txt, robots.txt, sitemap.xml)
3. Test component integration on one page

### Phase 2: Content Enhancement (Stories 3-4)
4. Add structured data to all course pages
5. Enhance meta tags across platform
6. Validate all schemas with testing tools

### Phase 3: FAQ & Monitoring (Story 5)
7. Create FAQ page with schema (if time permits)
8. Set up Google Search Console monitoring
9. Test AI assistant discoverability

---

## Technical Dependencies

### Existing System
- Next.js 12+ (current platform)
- React 18
- Firebase (course data source)
- Existing build/deployment pipeline

### New Dependencies (Minimal)
- `next-sitemap` - Automated sitemap generation (or custom script)
- No additional runtime dependencies

### Integration Points
- `pages/_document.js` - Global meta tags
- `pages/courses/[id].js` - Course-specific SEO
- `pages/index.js` - Homepage SEO
- `public/` directory - Static files

---

## Validation & Testing

### Schema Validation
- [ ] Google Rich Results Test - all schemas pass
- [ ] Schema.org Validator - no errors
- [ ] Google Search Console - no critical errors

### AI Readability Testing
- [ ] Test in ChatGPT with queries about courses
- [ ] Test in Claude with platform-related questions
- [ ] Test in Perplexity - verify citations appear
- [ ] Verify llm.txt accessible and properly formatted

### Performance Testing
- [ ] No negative impact on page load times
- [ ] Lighthouse SEO score 90+ on all pages
- [ ] Mobile usability maintained

---

## Rollout Strategy

### Development
1. Implement on dev environment
2. Validate all schemas and meta tags
3. Test AI crawler access (llm.txt, robots.txt)

### Staging
1. Full QA against AEO checklist
2. Google Rich Results Testing
3. Manual AI assistant testing

### Production
1. Deploy SEO component and static files
2. Submit sitemap to Google Search Console
3. Monitor for indexing issues
4. Track metrics (impressions, CTR, AI citations)

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Schema validation errors | High | Validate early and often with Google tools |
| Sitemap generation issues | Medium | Test with sample data, manual review |
| AI crawlers blocked | High | Test robots.txt thoroughly before deploy |
| Performance degradation | Medium | Monitor bundle size, lazy-load schemas |
| Duplicate content (canonical) | High | Careful canonical URL implementation |

---

## Success Criteria

**Must Have (Done = All Complete):**
- [ ] SEO component implemented and used on all pages
- [ ] llm.txt, robots.txt, sitemap.xml deployed
- [ ] All course pages have structured data
- [ ] All pages have canonical URLs and enhanced meta
- [ ] All schemas validated with no errors
- [ ] Platform appears in AI assistant responses

**Nice to Have:**
- [ ] FAQ page with schema implemented
- [ ] Google Search Console tracking configured
- [ ] Rich results appearing in Google SERP
- [ ] Documented SEO best practices for future content

---

## Related Documentation

- **AEO Checklist:** `.bmad-core/checklists/aeo-optimization.md`
- **Articles Platform Reference:** `/web3dev/forem-articles/static-articles/README.md`
- **Architecture:** `docs/internal/architecture.md` (to be updated)
- **Platform Features:** `docs/platform-features.md`

---

## Timeline Estimate

| Phase | Duration | Stories |
|-------|----------|---------|
| Foundation | 1-2 days | SEO-001.1, SEO-001.2 |
| Content Enhancement | 2 days | SEO-001.3, SEO-001.4 |
| FAQ & Testing | 1 day | SEO-001.5, validation |
| **Total** | **4-5 days** | 5 stories |

---

## Notes

- This is a **brownfield enhancement** to an existing Next.js platform
- Focus on **high-impact, low-complexity** changes
- Component-based approach allows for **incremental rollout**
- Can be extended later with additional AEO features if needed
- SEO is an iterative process - measure, learn, improve

---

**Created:** 2026-02-16
**Author:** BMad Master
**Status:** Ready for Story Implementation

# HustlersPoint Product Specification

## Vision
**"The thinking network for builders"** — a research-oriented community platform helping entrepreneurs, engineers, creators, SaaS builders, freelancers, and students publish original insights, build public, and strengthen personal brands.

## Core Values
- **Clarity over flashiness** — clean, professional UI inspired by GitHub/Stripe
- **High-quality long-form content** — research articles, case studies, hustler stories
- **Community-driven** — idea sharing, polls, discussions, and peer learning
- **Credibility first** — semantic HTML, schema markup, excellent SEO
- **Performance obsessed** — 90+ Lighthouse scores, fast load times
- **Dark/Light modes** — professional, modern design

---

## Sitemap & Pages

### Public Pages
```
/                          → Home (mission, featured content, CTA)
/articles                  → All articles (filtered, paginated, searchable)
/articles/[slug]           → Single article (with comments, sharing, related)
/category/[category]       → Articles by category (Tech, Business, Marketing, etc.)
/stories                   → Hustler stories & case studies
/community                 → Community hub (idea voting, polls, discussions)
/talent-showcase           → Showcase creator profiles & portfolios
/newsletter                → Subscribe & archive
/about                     → Vision, team, mission
/privacy-policy            → Legal
/terms-of-service          → Legal
```

### Structured Data (JSON-LD)
- Homepage: `Organization` schema
- Articles: `NewsArticle` + `BlogPosting` schemas
- Author profiles: `Person` schema
- Community hub: `AggregateRating` for ideas/polls

---

## Key Features

### 1. Home Page
- Hero section with mission statement
- Featured/trending content carousel
- Call-to-action for newsletter signup
- Social proof (member count, articles published, communities engaged)
- Smooth scroll-based reveals (Framer Motion)

### 2. Articles & Research
- **Long-form markdown articles** from GitHub
- **Category taxonomy** (Tech, Business, Marketing, Personal Growth, etc.)
- **Reading time estimate** and metadata
- **Breadcrumb navigation**
- **Related articles sidebar** (smart recommendations)
- **Comment section** (Disqus or custom)
- **Share buttons** (Twitter, LinkedIn, HN)
- **Author info & social links**
- **Newsletter CTA** at end of article

### 3. Community Hub
- **Idea voting** — post and vote on ideas
- **Polls** — quick feedback collection
- **Discussions** — threaded comments
- **Trending today/week/all-time**

### 4. Talent Showcase
- **Creator profiles** with bio, links, and featured work
- **Portfolio showcase** (projects, links, achievements)
- **Searchable & filterable** by skill/industry

### 5. Newsletter
- **Subscribe form** on every page
- **Archive page** with past issues
- **Signup tracking** for growth metrics

### 6. About & Vision
- Team/founder bios
- Mission statement
- Why HustlersPoint
- Roadmap preview

---

## Technical Stack

### Frontend
- **Next.js 15** (App Router, Server Components, Streaming)
- **Tailwind CSS** (utility-first, dark mode)
- **Framer Motion** (subtle animations, scroll reveals)
- **Radix UI** (accessible components)
- **TypeScript** (type safety)

### Content
- **Markdown/MDX** files in GitHub
- **gray-matter** (frontmatter parsing)
- **remark** (markdown processing)
- Static generation + ISR (incremental static regeneration)

### Performance & Analytics
- **@vercel/speed-insights** (Web Vitals monitoring)
- **Vercel Analytics** (optional)
- **Structured data** (JSON-LD) for SEO
- **Open Graph + Twitter cards**
- **Sitemap.xml + robots.txt**

### Deployment
- **Vercel** (zero-config, auto-scaling, edge functions)
- **GitHub integration** for content updates

---

## Design System

### Colors
- **Light mode**: White bg, slate-900 text, blue-600 accents
- **Dark mode**: Slate-950 bg, slate-50 text, blue-400 accents

### Typography
- **Headings**: Poppins (bold, 700)
- **Body**: Inter (regular, 400/500)
- **Code**: Mono font (Monaco/Courier)

### Spacing & Layout
- Max-width: 7xl (80rem) for content
- Sidebar layout for articles (content + related)
- Card-based design for communities/showcase

### Animations
- Fade-in on scroll (Framer Motion `useScroll`)
- Subtle hover states
- Page transitions (opacity)
- Loading states (skeleton loaders)

---

## SEO & Performance Targets

### SEO
- ✅ Semantic HTML5
- ✅ JSON-LD schema (Organization, NewsArticle, Person)
- ✅ Clean URLs + slugs
- ✅ Meta descriptions + OG images
- ✅ Sitemap.xml + robots.txt
- ✅ Mobile responsive
- ✅ Fast Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### Performance
- ✅ 90+ Lighthouse scores
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting
- ✅ Static generation where possible
- ✅ CDN caching via Vercel

---

## Future AI Features (Roadmap)

1. **Content Summaries** — AI-generated TLDR for articles
2. **Trending Topic Detection** — ML-powered trending insights
3. **Smart Recommendations** — Personalized article suggestions
4. **Auto-tagging** — ML-based category assignment
5. **Reading Analytics** — Time-on-page, engagement heatmaps
6. **Social proof notifications** — Real-time engagement alerts

---

## Success Metrics

- **Page speed**: Core Web Vitals (green across all pages)
- **SEO**: Top 3 rankings for target keywords (e.g., "startup insights," "technical deep dives")
- **Engagement**: 2+ min avg reading time, 15%+ share rate
- **Growth**: 10% MoM newsletter signups, 5% MoM article growth
- **Credibility**: 4.8+ star community rating, zero spam reports

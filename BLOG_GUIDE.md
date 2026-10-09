# Amanuro Stays SEO Blog Publishing Guide

Welcome to the Amanuro Stays blog contributor and content publishing guide. This guide explains **how to write, format, optimize, and publish** high-performance local SEO articles on `amanuro.in`.

Our blog engine is powered by local Markdown files stored under `content/blog/`, parsed by `gray-matter` and `marked`, and rendered dynamically via the Next.js App Router (`/blog` and `/blog/[slug]`).

---

## 1. Quick Start: How to Publish an Article in 4 Steps

Publishing a new article requires zero coding knowledge:

1. **Duplicate the Template**: Copy `content/blog/_template.md` to `content/blog/<your-slug>.md` (e.g., `content/blog/upsc-coaching-hostels-trivandrum.md`).
2. **Populate Frontmatter**: Fill in the title, description, excerpt, date, category, tags, and cover image according to the schema below.
3. **Draft the Article**: Write your content in standard Markdown using H2 (`##`) and H3 (`###`) headings, incorporating contextual internal links and conversion CTAs.
4. **Publish & Verify**: Set `draft: false`, run local tests to verify your article, and push to GitHub.

---

## 2. File Naming Conventions

- **File Path**: All blog articles must reside directly inside `content/blog/`.
- **File Extension**: Must end in `.md` (or `.mdx`).
- **Slug Format**: Use lowercase alphanumeric characters separated by hyphens (kebab-case):
  - ✅ Good: `content/blog/best-hostels-near-kerala-psc.md`
  - ❌ Bad: `content/blog/Best Hostels Near Kerala PSC.md`
  - ❌ Bad: `content/blog/article_123.md`
- **Drafts & Templates**: Any filename starting with an underscore (`_`), such as `_template.md` or `_draft-post.md`, is automatically ignored by the blog engine and excluded from public sitemaps and listings.

---

## 3. Frontmatter Schema Specification

Every article **must** begin with a YAML frontmatter block enclosed by triple dashes (`---`). The required fields and types are detailed below:

```yaml
---
# Compelling SEO title tag (50-65 characters)
title: "Hostel Guide for Kerala PSC Aspirants in Trivandrum: Plamood & Palayam Hubs"

# SERP meta description and OpenGraph summary (140-160 characters)
description: "Find the best mens PG and study accommodation in Trivandrum near Kerala PSC coaching academies in Plamood and Palayam. Rooms from ₹3,499/month."

# Short card teaser displayed on the /blog listing page (100-150 characters)
excerpt: "A comprehensive guide for PSC aspirants evaluating study hostels, quiet reading rooms, and budget rooms near Plamood and Palayam."

# Publication date in ISO 8601 YYYY-MM-DD format
date: "2026-10-15"

# Optional: Last modified date if updated later
lastModified: "2026-10-15"

# Structured author object
author:
  name: "Amanuro Editorial Team"
  role: "Student Living Advisor"
  avatar: "/amanuro-brand-logo.jpg"
  bio: "Local housing advisor helping students find focused, affordable accommodations in Trivandrum."

# Category (e.g., "Student Guide", "Coliving & IT", "Accommodation Comparison", "Budget Living")
category: "Student Guide"

# Keyword tags for filtering on /blog (minimum 3 tags)
tags:
  - "Kerala PSC"
  - "Palayam"
  - "Student PG"
  - "Budget Accommodation"

# Estimated reading time (e.g., "7 min read"). If omitted, calculated at 200 WPM.
readTime: "7 min read"

# Cover image path (relative to /public or external https URL)
coverImage: "/images/rooms/four-sharing.jpg"

# Canonical URL override (optional, defaults to https://amanuro.in/blog/<slug>)
canonicalUrl: "https://amanuro.in/blog/hostel-guide-kerala-psc-trivandrum"

# Draft toggle: true hides the post in production; false publishes it live
draft: false
---
```

### Frontmatter Validation Rules
1. **Title & Description**: Must be non-empty strings. Include your primary target keyword in both.
2. **Author**: Must be an object with both `name` and `role`.
3. **Category**: Match an existing category or create a clean, capitalized new one.
4. **Tags**: Must be a non-empty list of relevant strings.
5. **Cover Image**: Reference an existing image in `public/images/rooms/`, `public/images/blog/`, or `public/amanuro-brand-logo.jpg`.

---

## 4. Heading Hierarchy & Table of Contents (TOC)

The blog engine automatically extracts all `H2` and `H3` headings to generate the interactive Table of Contents in the desktop sidebar and mobile dropdown.

### Heading Guidelines
- **H1 (`#`)**: Used only once at the very top for the main article title.
- **H2 (`##`)**: Used for major content sections. These become the primary TOC entries.
- **H3 (`###`)**: Used for subsections under an H2. These become nested TOC entries.
- **Anchor IDs**: The blog engine automatically converts heading text into lowercase URL-safe slugs (e.g., `## Top Student Localities` becomes `#top-student-localities`). Avoid using special symbols like `/`, `?`, or emojis inside headings.

---

## 5. Mandatory Internal Linking Rules

Blog articles are our primary organic acquisition funnel. To maximize search equity and guide readers towards room bookings, **every article must include contextual internal links** to our location landing pages.

### Amanuro Stays Location Landing Hubs
| Destination Hub | URL Path | When to Link / Anchor Text Ideas |
|---|---|---|
| **Palayam Hub** | `/pg-in-palayam` | University students, PSC aspirants, library access: `[Palayam PG](/pg-in-palayam)`, `[Amanuro Stays Palayam Hub](/pg-in-palayam)` |
| **Pattom Hub** | `/pg-in-pattom` | Medical college, coaching corridor, Kesavadasapuram: `[Pattom PG](/pg-in-pattom)`, `[Pattom Hub rooms](/pg-in-pattom)` |
| **Vellayambalam Hub** | `/pg-in-vellayambalam` | Technopark transit, Kowdiar avenues, serene bachelors: `[Vellayambalam PG](/pg-in-vellayambalam)`, `[Vellayambalam executive rooms](/pg-in-vellayambalam)` |
| **Sasthamangalam Hub** | `/pg-in-sasthamangalam` | Quiet residential living, affordable vegetarian messes: `[Sasthamangalam PG](/pg-in-sasthamangalam)`, `[Sasthamangalam student accommodation](/pg-in-sasthamangalam)` |
| **Executive Dormitory** | `/executive-dormitory-trivandrum` | Exam revision bootcamps, pod stays, ultra-budget living from ₹3,499: `[Executive Dormitory in Trivandrum](/executive-dormitory-trivandrum)` |

### Internal Linking Best Practices
- **Natural Anchor Text**: Weave links directly into the sentence flow. Avoid generic text like "click here".
- **Coverage**: Include contextual links to at least 2 to 3 relevant location pages in every article. Flagship pillar articles should reference all 5 hubs.

---

## 6. High-Converting WhatsApp & Enquiry CTAs

Articles should never leave the reader without a direct path to book or inquire. Include WhatsApp call-to-actions throughout your content:

### 1. Mid-Article WhatsApp Callout
```markdown
> **Looking for a clean, peaceful PG in Trivandrum?**  
> Rooms starting from ₹3,499/month in Palayam, Pattom, Vellayambalam & Sasthamangalam. 5G Wi-Fi, washing machine & homestyle meals included.  
> 👉 [Chat directly on WhatsApp](https://wa.me/916282830532?text=Hi%20Amanuro%20Stays,%20I%20am%20reading%20your%20article%20and%20want%20to%20inquire%20about%20room%20availability)
```

### 2. End-of-Article Booking Section
```markdown
## Summary & How to Reserve Your Room

To verify current bed vacancies, schedule an in-person room inspection, or reserve your stay:
- **WhatsApp Support**: [Chat with Amanuro Trivandrum Helpdesk](https://wa.me/916282830532?text=Hi%20Amanuro%20Stays,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room)
- **Direct Helpline**: Call **+91 6282830532** (08:00 AM – 09:00 PM IST)
```

---

## 7. Media & Image Asset Management

- **Image Dimensions**: Recommended cover image aspect ratio is 16:9 or 1.91:1 (ideal dimensions: `1200 x 630 px`).
- **File Format**: Standard JPG or WebP compressed to under 200 KB for optimal Core Web Vitals.
- **Directory**: Place room and blog images in `public/images/rooms/` or `public/images/blog/`.
- **Existing Assets Available**:
  - `/images/rooms/four-sharing.jpg` (ideal for student sharing guides)
  - `/images/rooms/double-sharing.jpg` (ideal for IT & coliving guides)
  - `/images/rooms/dormitory-pods.jpg` (ideal for dormitory & pod guides)
  - `/images/rooms/triple-sharing.jpg` (ideal for budget guides)
  - `/images/rooms/single-room.jpg` (ideal for private executive rooms)
  - `/amanuro-brand-logo.jpg` (fallback brand image)

---

## 8. Verification & Publishing Checklist

Before deploying your new article to production, run through this quality assurance checklist:

1. **Word Count**: In-depth pillar guides should be over 1,200 words. Shorter topical guides should be at least 800 words.
2. **Frontmatter Integrity**:
   - `title` is descriptive and contains the primary keyword.
   - `description` is under 160 characters.
   - `author` has `name` and `role`.
   - `category` and `tags` are properly formatted.
   - `draft` is set to `false`.
3. **Internal Links**: Verified that all internal links use relative paths (e.g., `/pg-in-palayam`) and resolve properly.
4. **Local Verification**:
   - Run tests: `node tests/e2e/run-all.js`
   - Test build: `npm run build`
   - Test linting: `npm run lint`
5. **Check Sitemap**: Ensure your new article appears in `https://amanuro.in/sitemap.xml`.

Happy publishing! For editorial queries or feature requests, contact the Amanuro Stays tech and content team.

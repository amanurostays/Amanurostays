# 🏢 Zenith Living - High-Conversion Men's PG & Coliving Website

A modern, fast, SEO & AEO/GEO-optimized web application built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4** tailored specifically for high-conversion lead generation for Paying Guest (PG) and coliving businesses, engineered for **5-year multi-branch expansion**.

---

## 🚀 Key Features

### 1. High-Conversion Lead Funnel
- **1-Click WhatsApp Inquiries**: Direct chat buttons with contextual pre-filled messages (e.g., room-specific inquiries).
- **Direct Phone Calling**: One-tap phone call buttons on desktop header and mobile sticky bar.
- **Interactive "Schedule a Visit" Modal**: Allows prospective tenants to select their room preference, branch, and move-in timeline, immediately directing inquiries to your WhatsApp while showing on-screen confirmation.
- **Mobile Sticky Action Bar**: Bottom action bar optimized for smartphones where 85%+ of PG search traffic originates.

### 2. Built for 5-Year Expansion
- **Single Source of Truth Configuration (`src/config/pg-data.ts`)**: Edit brand name, phone numbers, WhatsApp, room pricing, amenities, and FAQs in one file.
- **Multi-Branch Ready**: Supports active branches, flagship hubs, and "Opening Soon" locations with live Google Maps embeds and transit connectivity details. As you acquire or open new PG buildings over the next 5 years, simply append a branch object in `pg-data.ts`.

### 3. Maximum SEO, Local SEO & AEO/GEO Optimization
- **Schema.org Structured Data (`src/components/JsonLd.tsx`)**:
  - `LodgingBusiness` / `LocalBusiness` Schema: Geo-coordinates, address, amenities, price range, opening hours, and aggregate rating.
  - `FAQPage` Schema: Injects structured Q&A pairs directly into Google search results for FAQ rich snippets and generative engines (ChatGPT Search, Perplexity, Google Gemini AI Overviews).
  - `BreadcrumbList` Schema: Improves search result hierarchy.
- **Dynamic XML Sitemap (`/sitemap.xml`) & `robots.txt`**: Automatically generated for fast search engine indexing.
- **OpenGraph & Twitter Cards**: High-resolution preview cards for WhatsApp and social media sharing.

### 4. Transparent Authority & Trust Building
- **Zenith Living vs Typical Local PG Comparison**: Direct comparison table highlighting zero brokerage, 1-month refundable deposit, in-house FSSAI hygienic food, and 300 Mbps Wi-Fi.
- **Detailed 3x Food Menu Showcase**: In-house kitchen protocol, daily breakfast/lunch/dinner schedule, and office lunchbox service.
- **Verified Resident Reviews**: Testimonials tagged by profession (Software Engineer @ Flipkart, etc.) and stay duration.

---

## 🛠️ How to Customize Your Details

Open [`src/config/pg-data.ts`](file:///c:/Users/ijas2/Documents/antigravity/PG%20website/src/config/pg-data.ts) to update any of the following in seconds:

1. **Brand & Contact Info**:
   ```typescript
   brand: {
     name: "Your PG Name",
     primaryPhone: "+91 98765 43210",
     primaryPhoneClean: "+919876543210",
     whatsappNumber: "919876543210",
     ...
   }
   ```
2. **Branches & Locations**:
   Add or edit branch addresses, landmarks, Google Maps embed URLs, and total bed counts.
3. **Room Pricing & Sharing Options**:
   Update monthly rent, original anchor price, security deposit terms, and room amenities.
4. **Food Menu & Daily Meals**:
   Customize the breakfast, lunch, and dinner items.
5. **FAQs**:
   Add or edit questions and answers; the website and Schema JSON-LD will update simultaneously.

---

## 💻 Running Locally

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live website.

### Production Build
```bash
npm run build
npm run start
```

---

## 🌐 1-Click Deployment (Vercel / Netlify)
1. Push this project to GitHub.
2. Connect your repository to **Vercel** ([vercel.com](https://vercel.com)).
3. Vercel automatically detects Next.js and builds the project with zero configuration.
4. Link your custom domain (e.g. `yourpgname.com`) and add SSL with one click.

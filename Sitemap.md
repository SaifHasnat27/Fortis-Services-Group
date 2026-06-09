# Context
This codebase was originally built for **Eye Spot Eye Care** (an optometry practice), then forked to create the website for **Just Frameless** (residential fencing). It has now been successfully migrated to create the brand-new website for **Fortis Services Group**.

The core services provided by Fortis Services Group are:
1. **Asset Compliance & Management** – Managing and tracking legally required assessments (smoke alarms, switchboard thermal imaging, emergency lighting, fire equipment) and preventative schedules.
2. **24/7 Reactive Maintenance** – Direct technician deployment via a single helpdesk to resolve critical breakdowns and urgent repair requests.
3. **Integrated Trade Services** – Multi-disciplinary trade solutions across electrical, plumbing, refrigeration, HVAC, and general building maintenance.

Fortis Services Group offers a single point of contact for asset maintenance, compliance, and trade services. Their target audience spans Hospitality, Manufacturing, Warehouse, High‑rise offices, and Aged care across Sydney, Wollongong, Central Coast and surrounding suburbs.

# Sitemap & Architecture

## 1. Pages & Routes
- `app/page.tsx` (`/`) - Main landing page showcasing services (Asset Compliance, Reactive Maintenance, Integrated Trade Services), business specialty (Simplify Asset Compliance & Maintenance), Google reviews, contact form, and FAQ. *(Note: Our Work / collections and Instagram gallery sections have been removed from the visible interface, though components remain in the codebase).*
- `app/about/page.tsx` (`/about`) - About page detailing history, values (Reliability, Transparency, Accountability), and the step-by-step helpdesk operation workflow ("You Reach Out. We Handle the Rest.").
- `app/contact/page.tsx` (`/contact`) - Contact/Booking page containing the request form, opening hours (Mon-Fri 9AM-5PM, 24/7 Emergency Support), and service locations.
- `app/services/page.tsx` (`/services`) - In-depth service categories and descriptions mapped using interactive tabs.
- `app/areas-served/page.tsx` (`/areas-served`) - Placeholder listing targeted service areas (Sydney, Wollongong, Central Coast) as "Coming Soon".
- `app/privacy-policy/page.tsx` (`/privacy-policy`) - [PLANNED] Privacy Policy page outlining data protection compliance.
- `app/terms-and-conditions/page.tsx` (`/terms-and-conditions`) - [PLANNED] Terms and Conditions page detailing service agreements.

## 2. Page Connections
- `/` -> Links to `/services`, `/contact` (Get a Free Quote / Request a Free Quote) and direct call/WhatsApp buttons.
- `/about` -> Links to `/contact` (Request a Free Quote CTA).
- `/services` -> Links to `/contact` (Request a Free Quote CTA).
- `/contact` -> Main scheduling and form entry point.
- **Global Footer (All pages)** -> Links to `/privacy-policy` and `/terms-and-conditions`.

## 3. Key Components Per Page
- `/`: `components/ui/HeroBanner.tsx`, `components/servicecards/ServiceCards.tsx`, `components/layout/HomeSpecialty.tsx`, `components/ui/TestimonialsCarousel.tsx`, `components/servicecards/faq.tsx` (FAQ Section), `components/forms/ContactForm.tsx`, `components/contact/QuickContact.tsx`
- `/about`: `components/ui/SectionWrapper.tsx`, `components/ui/PageBanner.tsx`, Lucide icons, `components/ui/Button.tsx`
- `/contact`: `components/forms/ContactForm.tsx`, `components/contact/QuickContact.tsx`, `components/servicecards/faq.tsx`, `components/ui/PageBanner.tsx`
- `/services`: `components/ui/Tabs.tsx`, `components/ui/PageBanner.tsx`

## 4. Shared/Global Components
- `components/layout/Navbar.tsx` - Main site navigation (links to Home, About, Services, Contact, Areas Served).
- `components/layout/Footer.tsx` - Footnote section containing brand wordmark, location tags, standard opening hours, 24/7 Emergency Support CTA, and legal footer links.
- `components/layout/Wordmark.tsx` - Reusable brand wordmark component.
- `components/ui/SectionWrapper.tsx` - Container wrapper ensuring consistent padding/margins.
- `components/ui/Button.tsx` - Global button styles.
- `components/contact/QuickContact.tsx` - CTA section featuring Call, Email, and direct **WhatsApp** connections. Reused on `/` and `/contact`.
- `components/ui/PageBanner.tsx` - Header banner component dynamically used across subpages.

## 5. Data Sources Per Page
- `lib/constants.ts` (BUSINESS data) - Main brand configurations, including email, phone, location coverage, and hours.
- `lib/servicesData.ts` - Array of core services defining titles, descriptions, bullets, default illustration/image paths, and Lucide icons.
- `lib/pageBannerData.ts` - Heading/subheading configurations consumed by subpage headers.
- `components/servicecards/answer.tsx` - Array of FAQ items specific to Fortis Services Group (e.g. single point of contact, compliance, response times).
- `lib/schema.ts` - Local business structured data (`ProfessionalService`) parsed site-wide inside layout.tsx.

## 6. Tech Stack
- **Framework & Core**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, PostCSS
- **Animations**: GSAP, Framer Motion
- **Forms**: React Hook Form, Zod, `@hookform/resolvers`
- **Icons**: Lucide React

---

### Project Status Note
We have successfully completed all core copy, data, metadata, schema, and page translations to migrate the site for **Fortis Services Group**. Unneeded sections (like "Our Work" collections and the Instagram gallery) have been removed from the front-end layout of all pages.

**Next Steps to Finalize:**
1. Create the **Privacy Policy** page (`app/privacy-policy/page.tsx`).
2. Create the **Terms & Conditions** page (`app/terms-and-conditions/page.tsx`).
3. Add links to both legal pages in `components/layout/Footer.tsx`.
4. Fix and update remaining image alt texts and clean up template comments/leftover components from previous forks.
5. Replace static placeholder image files in the public directory with real company assets.
6. Perform a final responsive UI and browser validation pass.

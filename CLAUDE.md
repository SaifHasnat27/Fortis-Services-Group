# Fortis Services Group Website

## Technology Stack
- Next.js 16 (App Router) & React 19
- Tailwind CSS v4
- GSAP + @gsap/react
- Framer Motion
- Zod + React Hook Form
- TypeScript (Strict)

## Code Style
- **Components**: Functional components with hooks. Use `useGSAP` for animations.
- **Styling**: Tailwind classes preferred. Theme tokens must be used from `globals.css` variables.
- **Naming**: 
  - Files: kebab-case or PascalCase for components.
  - Components: PascalCase.
- **Layout**: Use `<SectionWrapper />` for all major page sections.

## Theme & Styling Tokens
- **Backgrounds**: Use `bg-base-secondary` (main body background) and `bg-base` (card/lifted elements background).
- **Text**: Use `text-primary` (headings/primary text), `text-secondary` (supporting copy), and `text-muted` (labels/captions).
- **Borders**: Use `border-[var(--border)]` (subtle default border) and `hover:border-[var(--border-dark)]` (active/hover focus state).

## Key Files
- `app/globals.css`: Theme tokens and Tailwind config.
- `lib/constants.ts`: Business information (currently Just Frameless constants, transitioning).
- `lib/pricingData.ts`: Pricing/rates source of truth.
- `components/forms/ContactForm.tsx`: Shared contact form.

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Conventions
- Always wrap GSAP code in `useGSAP` with a scope.
- Use `BUSINESS` constant for all business details.
- Pricing details should be loaded from `lib/pricingData.ts`.



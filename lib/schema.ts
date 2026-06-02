import { BUSINESS } from './constants';

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": BUSINESS.name,
  "image": `${BUSINESS.url}/og-image.jpg`,
  "telephone": BUSINESS.phone,
  "email": BUSINESS.email,
  "url": BUSINESS.url,
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": BUSINESS.serviceArea
  },
  "priceRange": "$$",
  "currenciesAccepted": "AUD",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
};


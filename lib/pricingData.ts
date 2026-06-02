// Types
export interface SizeItem {
  label: string;
  short?: string;
  medium?: string;
  long?: string;
  boys?: string;
  girls?: string;
  note?: string;
}

export interface FlatItem {
  label: string;
  price?: string;
  note?: string;
}

export type PricingItem = SizeItem | FlatItem;

export interface Category {
  id: string;
  label: string;
  hasSizes: boolean;
  items: PricingItem[];
}

// Data
export const categories: Category[] = [
  {
    id: 'cut-style',
    label: 'Cut & Style',
    hasSizes: true,
    items: [
      { label: "Men's Cut & Wash", price: '$50' },
      { label: 'Buzz Cut', price: '$40' },
      { label: 'Student Cut', price: '$45' },
      { label: 'Kids Cut (under 12)', boys: '$40', girls: '$45' },
      { label: "Women's Cut", short: '$60', medium: '$60', long: '$65' },
      { label: "Women's Cut & Wash", short: '$70', medium: '$70', long: '$75' },
      { label: "Women's Cut, Wash & Blow Dry", short: '$80', medium: '$80', long: '$90' },
      { label: 'Wash & Blow Dry', short: '$50', medium: '$60', long: '$65' },
    ],
  },
  {
    id: 'colour',
    label: 'Colour',
    hasSizes: true,
    items: [
      { label: 'Root Colour', short: '$100', medium: '$120' },
      { label: 'Full Colour', short: '$150', medium: '$180', long: '$220' },
      { label: 'Balayage / Ombré', short: '$300', medium: '$300', long: '$380' },
      { label: 'Bleach & Colour', short: '$220', medium: '$280', long: '$380' },
      { label: 'Root Bleach', short: '$170', long: '$200' },
      { label: 'Toner', short: '$30', medium: '$40', long: '$40' },
      { label: "Men's Cut & Colour", short: '$140' },
      { label: '1/4 Foils & Balayage', short: '$160', medium: '$160', long: '$170' },
      { label: '1/2 Foils & Balayage', short: '$220', medium: '$220', long: '$250' },
      { label: 'Full Head Foils & Balayage', short: '$250', medium: '$250', long: '$280' },
    ],
  },
  {
    id: 'perm',
    label: 'Perm',
    hasSizes: true,
    items: [
      { label: 'Perm + Cut (Men)', price: '$180' },
      { label: 'Down Perm + Cut', price: '$130' },
      { label: 'Iron Perm (Men)', short: '$180', medium: '$200', long: '$250' },
      { label: 'Cold Perm (Women)', short: '$150', medium: '$180', long: '$200' },
      { label: 'Digital Perm', short: '$200', medium: '$250', long: '$280' },
    ],
  },
  {
    id: 'straightening',
    label: 'Straightening',
    hasSizes: true,
    items: [
      { label: 'Japanese Shiseido', short: '$180', medium: '$220', long: '$260' },
      { label: 'Nano Plasty Keratin', short: '$180', medium: '$220', long: '$260' },
    ],
  },
  {
    id: 'treatment',
    label: 'Treatment',
    hasSizes: true,
    items: [
      { label: '5-Step Mucota', short: '$120', medium: '$140', long: '$160' },
    ],
  },
];

// Helper
export function isSizeItem(item: PricingItem): item is SizeItem {
  return 'short' in item || 'medium' in item || 'long' in item || 'boys' in item || 'girls' in item;
}
export interface BannerData {
  heading: string;
  subheading: string;
  desktopSrc: string;
  mobileSrc: string;
}

export const PAGE_BANNERS: Record<string, BannerData> = {
  about: {
    heading: "Fortis Services Group",
    subheading: "A single point of contact for asset maintenance, compliance and trade services across Sydney, Wollongong, Central Coast & surrounding areas.",
    desktopSrc: "/images/pageBanner/about.webp",
    mobileSrc: "/images/pageBanner/about-mobile.webp",
  },
  services: {
    heading: "Our Services",
    subheading: "Asset compliance management, 24/7 reactive maintenance and integrated trade services for commercial businesses across Sydney and surrounds.",
    desktopSrc: "/images/pageBanner/services.webp",
    mobileSrc: "/images/pageBanner/services-mobile.webp",
  },
  contact: {
    heading: "Get a Free Quote",
    subheading: "Speak to our team about a tailored asset and compliance management plan for your business. We cover Sydney, Wollongong, Central Coast & surrounding areas.",
    desktopSrc: "/images/pageBanner/contact.webp",
    mobileSrc: "/images/pageBanner/contact-mobile.webp",
  },
  areasServed: {
    heading: "Areas Served",
    subheading: "Proudly supporting businesses across Sydney, Wollongong, Central Coast and surrounding regions with asset compliance, maintenance and trade services.",
    desktopSrc: "/images/pageBanner/areas.webp",
    mobileSrc: "/images/pageBanner/areas-mobile.webp",
  },
};
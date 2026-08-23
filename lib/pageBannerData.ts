export interface BannerData {
  heading: string;
  subheading: string;
  desktopSrc: string;
  mobileSrc: string;
  /**
   * Alt text for the banner image. Shared by the mobile and desktop crops,
   * since they show the same subject at different aspect ratios.
   *
   * This describes the PHOTO, not the page. It deliberately does not repeat
   * the heading: the heading is already a real <h1> in the markup, so reusing
   * it here would make a screen reader announce the same words twice.
   */
  imageAlt: string;
}

export const PAGE_BANNERS: Record<string, BannerData> = {
  about: {
    heading: "Fortis Services Group",
    subheading: "A single point of contact for asset maintenance, compliance and trade services across Sydney, Wollongong, Central Coast & surrounding areas.",
    desktopSrc: "/images/pageBanner/about.webp",
    mobileSrc: "/images/pageBanner/about-mobile.webp",
    imageAlt: "Fortis Services Group maintenance technicians on site at a commercial property",
  },
  services: {
    heading: "Our Services",
    subheading: "Asset compliance management, 24/7 reactive maintenance and integrated trade services for commercial businesses across Sydney and surrounds.",
    desktopSrc: "/images/pageBanner/services.webp",
    mobileSrc: "/images/pageBanner/services-mobile.webp",
    imageAlt: "Technician carrying out electrical and building maintenance work",
  },
  contact: {
    heading: "Get a Free Quote",
    subheading: "Speak to our team about a tailored asset and compliance management plan for your business. We cover Sydney, Wollongong, Central Coast & surrounding areas.",
    desktopSrc: "/images/pageBanner/contact.webp",
    mobileSrc: "/images/pageBanner/contact-mobile.webp",
    imageAlt: "Fortis Services Group helpdesk team taking a maintenance request",
  },
  areasServed: {
    heading: "Areas Served",
    subheading: "Proudly supporting businesses across Sydney, Wollongong, Central Coast and surrounding regions with asset compliance, maintenance and trade services.",
    desktopSrc: "/images/pageBanner/areas.webp",
    mobileSrc: "/images/pageBanner/areas-mobile.webp",
    imageAlt: "Aerial view of the Sydney region serviced by Fortis Services Group",
  },
};
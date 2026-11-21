// Real Google reviews (verbatim) for the Google Ads landing pages.
// Shown under the Google "G" logo, so only genuine Google reviews go here.

export interface LpReview {
  name: string;
  review: string;
}

export const LP_REVIEWS: LpReview[] = [
  {
    name: "Tamara Rose",
    review:
      "We’ve had a great experience with Fortis Services Group over the past 3 months. Any time we need them, they’re quick to respond and provide peace of mind that our equipment is being properly maintained. We highly recommend Fortis Services Group to any business that relies on commercial refrigeration. It’s reassuring to have a team you can trust!",
  },
  {
    name: "Nathan Stack",
    review:
      "Josh from Fortis came to our warehouse in Bankstown. After we had issues with our main fridge. He was polite and quick in identifying and repairing the issue. He also helped rectify some small issues he picked up whilst being on site. Would highly recommend Fortis for any of your service needs.",
  },
  {
    name: "Dee Tee",
    review:
      "Our venue in Carlton has a coolroom and fridge that we can’t afford to go down. We have been using Fortis Services Group for about 4 months now, they are always on top of things, responds quickly and makes sure everything is always looked after. Cant recommend them highly enough for any business using fridges/freezer and cool rooms",
  },
];

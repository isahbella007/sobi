// Placeholder content for the SOBI mockup. Every CONFIRM/TODO marker below
// is real client-facing copy that must be swapped before launch.
//
// Translatable copy lives in src/messages/{en,de}.json instead of here —
// this file only holds locale-agnostic data (hrefs, prices, image paths,
// contact placeholders) plus a stable `id` per array item so components
// can look up the matching translated strings by that id.

export const daughterName = "Tyra";
export const daughterPhoto = "/team/tyra.jpg";

export const streetAddress = "Street Address";
export const postalCity = "1120 Wien";
export const openingHours = "10AM - 4PM";
export const phoneNumber = "xxx-xxx-xxx-xx";
export const bookingLink = "#book"; // CONFIRM: replace with phone/email/booking link

// TODO: replace with the studio's exact address once confirmed — this is a
// generic 1120 Wien centre placeholder.
export const mapQuery = "1120 Wien, Austria";
export const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

export const navLinks = [
  { id: "about", href: "/about" },
  { id: "services", href: { pathname: "/", hash: "services" } },
  { id: "findUs", href: { pathname: "/", hash: "find-us" } },
  { id: "book", href: { pathname: "/", hash: "book" } },
] as const;

// Still used by BentoHero.tsx, which is currently unused/unmounted — left
// as plain English rather than migrated, same as the rest of that component.
export const serviceChips = ["Skincare", "Foot care", "Hand care", "Waxing"];

export const services = [
  { id: "skincare" },
  { id: "footCare" },
  { id: "handCare" },
  { id: "waxing" },
] as const;

export const heroFootNoteHref = "#find-us";

export const pricingCategories = [
  {
    id: "skincare",
    items: [
      { id: "expressFacial", price: "€45" },
      { id: "signatureFacial", price: "€75" },
      { id: "deepCleanse", price: "€85" },
    ],
  },
  {
    id: "footCare",
    items: [
      { id: "classicPedicure", price: "€40" },
      { id: "medicalFootCare", price: "€60" },
      { id: "callusNailTreatment", price: "€35" },
    ],
  },
  {
    id: "handCare",
    items: [
      { id: "classicManicure", price: "€35" },
      { id: "gelManicure", price: "€50" },
      { id: "paraffinHandTreatment", price: "€25" },
    ],
  },
  {
    id: "waxing",
    items: [
      { id: "eyebrowLip", price: "€12" },
      { id: "halfLeg", price: "€28" },
      { id: "fullLeg", price: "€45" },
    ],
  },
] as const;

// CONFIRM: fabricated placeholder quotes — swap for real client testimonials
// once the studio has some to share. Eight rather than three so the "wall
// of love" marquee in Testimonials.tsx has enough to loop convincingly.
// `name` is a proper noun (identical in both locales); quote/service text
// live in messages.
export const testimonials = [
  { id: "annaK", name: "Anna K." },
  { id: "markusR", name: "Markus R." },
  { id: "priyaS", name: "Priya S." },
  { id: "elisabethW", name: "Elisabeth W." },
  { id: "juliaF", name: "Julia F." },
  { id: "nadiaB", name: "Nadia B." },
  { id: "thomasG", name: "Thomas G." },
  { id: "saraM", name: "Sara M." },
] as const;

export const socialLinks = [
  { label: "Instagram", href: "#" }, // CONFIRM: real Instagram URL
  { label: "Facebook", href: "#" }, // CONFIRM: real Facebook URL
];

// CONFIRM: fabricated placeholder — swap for the studio's real rating once
// they have a Google/Instagram review count to point to. Currently unused
// (commented out in Hero.tsx).
export const heroRating = {
  score: "4.9",
  outOf: "5",
  reviewCount: "150+",
};

// Currently unused (LockedTile.tsx, its only consumer, is commented out in
// Services.tsx) — left untranslated until it's actually wired back in.
export const lockedTeasers = [
  { label: "FAQ", sub: "Answers to common questions, coming soon" },
  { label: "Online booking", sub: "Book instantly online, coming soon" },
];


export const daughterName = "Tyra";
export const daughterPhoto = "/team/tyra.jpg";

export const streetSomething = "Donauzentrum Ärztezentrum "
export const streetAddress = "Donaustadtstraße 1, Stock 5 Top 705";
export const postalCity = "1220 Wien";

// Real contact info from the client's price list (public/sobi folder/*.pdf,
// page 1). No online booking — every "book" CTA on the site is a phone
// call, so this is both the display number and the tel: href value.
export const phoneNumber = "0660 121 00 73";
export const phoneNumberTel = "+436601210073";


// generic 1120 Wien centre placeholder.
export const mapQuery = "Donaustadtstraße 1, 1220 Wien, Austria";
export const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

// Real "getting here" perks from the client — icon assignment lives in
// FindUs.tsx (a code-level/visual choice), translated labels live in
// messages under `findUs.perks.<id>`.
export const findUsPerks = [
  "accessible",
  "u1Kagran",
  "bus26A",
  "tram25",
  "taxiStand",
  "bikeParking",
  "parkingGarage",
  "donauZentrum",
] as const;

export const navLinks = [
  { id: "about", href: "/about" },
  { id: "services", href: "/services" },
  { id: "findUs", href: { pathname: "/", hash: "find-us" } }
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

// Three flagship picks per category, pulled from the real Feb 2026 price
// list (see `priceListCategories` below for the full menu) — a curated
// spread of price points, not just the cheapest or priciest three.
export const pricingCategories = [
  {
    id: "skincare",
    items: [
      { id: "expertCleansProSystem", price: "€90" },
      { id: "aquatermRecovery", price: "€105" },
      { id: "powerRetinol", price: "€115" },
    ],
  },
  {
    id: "footCare",
    items: [
      { id: "footCareClassic", price: "€53" },
      { id: "nailProsthetics", price: "€45" },
      { id: "nailBrace", price: "€42" },
    ],
  },
  {
    id: "handCare",
    items: [
      { id: "manicureClassic", price: "€40" },
      { id: "shellacManicure", price: "€60" },
      { id: "paraffinAlone", price: "€35" },
    ],
  },
  {
    id: "waxing",
    items: [
      { id: "lowerLegKnee", price: "€29" },
      { id: "bikini", price: "€23" },
      { id: "upperLip", price: "€15" },
    ],
  },
] as const;

// The complete Feb 2026 price list (public/sobi folder/*.pdf), grouped by
// the same 4 brand categories as `services` above, each broken into the
// PDF's own sub-groups so a dense category still reads cleanly. Item
// display names/descriptions live in messages under `priceList.items.<id>`
// — this only holds ids, prices, and the "from" flag for open-ended prices.
export type PriceListItem = { id: string; price: string; fromPrice?: boolean };
export type PriceListGroup = { id: string; items: PriceListItem[] };
export type PriceListCategory = {
  id: "skincare" | "footCare" | "handCare" | "waxing";
  groups: PriceListGroup[];
};

export const priceListCategories: PriceListCategory[] = [
  {
    id: "skincare",
    groups: [
      {
        id: "cleansing",
        items: [
          { id: "expertCleansProSystem", price: "€90" },
          { id: "clearBalance", price: "€85" },
        ],
      },
      {
        id: "hydration",
        items: [
          { id: "aquatermRecovery", price: "€105" },
          { id: "powerHyaluronicDynamic", price: "€110" },
          { id: "powerHyaluronicEyeContour", price: "€70" },
        ],
      },
      {
        id: "intensivSpecial",
        items: [
          { id: "powerCPlus", price: "€110" },
          { id: "powerRetinol", price: "€115" },
        ],
      },
      {
        id: "antiAging",
        items: [
          { id: "globalLift", price: "€140" },
          { id: "correctiveProgramm", price: "€195" },
        ],
      },
      {
        id: "menTreatments",
        items: [
          { id: "intensiveHydratingTreatment", price: "€85" },
          { id: "expressEnergizingTreatment", price: "€85" },
          { id: "bacialBackTreatment", price: "€86" },
        ],
      },
      {
        id: "addOns",
        items: [
          { id: "intensivAmpullen", price: "€17", fromPrice: true },
          { id: "eyeContourPatches", price: "€17" },
          { id: "diamondPeel", price: "€58" },
          { id: "ultrasoundTreatment", price: "€23" },
          { id: "faceMassage", price: "€23" },
        ],
      },
      {
        id: "browLash",
        items: [
          { id: "browTinting", price: "€18" },
          { id: "lashTinting", price: "€18" },
          { id: "browShaping", price: "€15" },
        ],
      },
    ],
  },
  {
    id: "footCare",
    groups: [
      {
        id: "treatments",
        items: [
          { id: "footCareClassic", price: "€53" },
          { id: "acuteAppointment", price: "€35", fromPrice: true },
          { id: "nailBrace", price: "€42" },
          { id: "nailProsthetics", price: "€45" },
          { id: "toenailPolish", price: "€10" },
        ],
      },
    ],
  },
  {
    id: "handCare",
    groups: [
      {
        id: "treatments",
        items: [
          { id: "manicureClassic", price: "€40" },
          { id: "smallNailService", price: "€15" },
          { id: "nailPolish", price: "€10" },
          { id: "shellacManicure", price: "€60" },
          { id: "shellacRemoval", price: "€40" },
          { id: "paraffinWithTreatment", price: "€25" },
          { id: "paraffinAlone", price: "€35" },
        ],
      },
    ],
  },
  {
    id: "waxing",
    groups: [
      {
        id: "women",
        items: [
          { id: "upperLip", price: "€15" },
          { id: "chin", price: "€15" },
          { id: "cheeks", price: "€15" },
          { id: "underarm", price: "€19" },
          { id: "forearm", price: "€26" },
          { id: "upperArm", price: "€26" },
          { id: "lowerLegKnee", price: "€29" },
          { id: "upperLeg", price: "€29" },
          { id: "bikini", price: "€23" },
        ],
      },
      {
        id: "men",
        items: [
          { id: "backNeck", price: "€53" },
          { id: "chest", price: "€29" },
          { id: "belly", price: "€29" },
        ],
      },
    ],
  },
];

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

// Real FAQ content from the client (public/sobi folder/faq.jpeg). Question/
// answer text lives in messages under `faq.items.<id>` — this only holds
// the grouping and ordering.
export const faqCategories = [
  {
    id: "generalAppointments",
    questionIds: ["parking", "bookingRequired", "howToBook", "cancelReschedule", "lateArrival"],
  },
  {
    id: "footCare",
    questionIds: ["treatmentFrequency", "fungalNails", "ownNailPolish"],
  },
  {
    id: "payments",
    questionIds: ["paymentMethods"],
  },
] as const;

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

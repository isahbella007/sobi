// Placeholder content for the SOBI mockup. Every CONFIRM/TODO marker below
// is real client-facing copy that must be swapped before launch.

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
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#find-us", label: "Find us" },
  { href: "#book", label: "Book" },
];

export const serviceChips = ["Skincare", "Foot care", "Hand care", "Waxing"];

export const heroHeadline = "Expert care for";
export const heroTypewriterWords = ["Skincare", "Foot", "Hand", "Waxing"];
export const heroTagline = "A trusted studio in Vienna’s 12th.";
export const heroMessage =
  "A quiet studio for skin and feet care in Vienna’s 12th district — thorough, careful, and genuinely glad to have you. Two generations of expert hands, one calm standard of care.";

export const services = [
  {
    name: "Skincare",
    description: "Facials and skin treatments tailored to how your skin actually behaves.",
  },
  {
    name: "Foot care",
    germanName: "Podologische Fußpflege",
    description:
      "Thorough, careful foot and nail care. [CONFIRM: if trained Podologin, say ‘Medical-grade podology done properly.’]",
  },
  {
    name: "Hand care",
    description: "Manicures and hand treatments — the details people notice.",
  },
  {
    name: "Waxing",
    description: "Clean, comfortable waxing, start to finish.",
  },
];

export const stats = [
  { value: "5,000+", label: "Clients served" }, // CONFIRM: real client count
  { value: "15", label: "Years of experience" }, // CONFIRM: real years in business
  { value: `${services.length}`, label: "Core services" },
];

// CONFIRM: fabricated placeholder — swap for the studio's real rating once
// they have a Google/Instagram review count to point to.
export const heroRating = {
  score: "4.9",
  outOf: "5",
  reviewCount: "150+",
};

export const heroFootNote = {
  text: `Open ${openingHours}, by appointment.`,
  linkLabel: "Find us",
  href: "#find-us",
};

export const lockedTeasers = [
  { label: "Pricing", sub: "Full price list, coming soon" },
  { label: "FAQ", sub: "Answers to common questions, coming soon" },
  { label: "Online booking", sub: "Book instantly online, coming soon" },
];

export const socialLinks = [
  { label: "Instagram", href: "#" }, // CONFIRM: real Instagram URL
  { label: "Facebook", href: "#" }, // CONFIRM: real Facebook URL
];

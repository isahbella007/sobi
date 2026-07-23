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
  { href: "/about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#find-us", label: "Find us" },
  { href: "/#book", label: "Book" },
];

// Verbatim copy supplied by the owner for the About page — do not edit the
// wording, only the surrounding presentation. One entry per paragraph.
export const aboutParagraphs = [
  "Since 2014, our family-owned business in Vienna's Donaustadt district has stood for quality, expertise, and personal care. Our passion for beauty treatments and foot care is not just our profession—it is our vocation.",
  "I have been practicing my profession with great joy, dedication, and passion for over 30 years. During this time, I have had the privilege of caring for many clients and gaining valuable experience. Today, it fills me with great pride to pass on this knowledge and passion to the next generation.",
  "Today, we run our business together as a mother-and-daughter team. By combining decades of experience with fresh ideas and modern expertise, we are able to blend proven techniques with innovative treatment methods. This allows us to create a warm, welcoming atmosphere where every client feels comfortable, understood, and well cared for.",
  "To provide the highest quality treatments, we place great importance on continuous professional development. By regularly attending seminars, workshops, refresher courses, and advanced training programs, we continuously expand our knowledge and stay up to date with the latest developments in beauty therapy and foot care.",
  "The health and well-being of your skin and feet are our highest priorities. That is why we work according to the highest standards of hygiene and quality, offer personalized consultations, and continuously improve our quality management.",
  "As a member of the Austrian Federal Economic Chamber (WKO), we comply with all professional and quality standards and are committed to professionalism, safety, and trust.",
];

export const serviceChips = ["Skincare", "Foot care", "Hand care", "Waxing"];

export const heroHeadline = "Expert care for";
export const heroTypewriterWords = ["Skincare", "Foot", "Hand", "Waxing"];
export const heroTagline = "A trusted studio in Vienna’s 12th.";
// CONFIRM: Lorem Ipsum placeholder — swap for real copy before launch.
export const heroMessage =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget urna mollis ornare vel eu leo. Cras ultricies ligula sed magna dictum porta.";

export const services = [
  {
    name: "Skincare",
    description: "Facials and skin treatments tailored to how your skin actually behaves.",
  },
  {
    name: "Foot care",
    germanName: "Podologische Fußpflege",
    description:
      "Thorough, careful foot and nail care.",
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
  // shortLabel is the compact mobile form (e.g. "5k+ Clients") — the
  // full value/label pairing is too large a treatment for mobile width.
  { value: "5,000+", shortLabel: "5k+ Clients", label: "Clients served" }, // CONFIRM: real client count
  { value: "15", shortLabel: "15 Years", label: "Years of experience" }, // CONFIRM: real years in business
  { value: `${services.length}`, shortLabel: `${services.length} Services`, label: "Core services" },
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
  { label: "FAQ", sub: "Answers to common questions, coming soon" },
  { label: "Online booking", sub: "Book instantly online, coming soon" },
];

// CONFIRM: entirely fabricated treatments and prices — a placeholder price
// list so the section has real editorial weight, not the studio's actual
// pricing. Swap for the real list before launch.
export const pricingNote = "Indicative pricing — final list confirmed by the studio.";

export const pricingCategories = [
  {
    name: "Skincare",
    items: [
      { label: "Express Facial", price: "€45" },
      { label: "Signature Facial", price: "€75" },
      { label: "Deep Cleanse & Extraction", price: "€85" },
    ],
  },
  {
    name: "Foot care",
    items: [
      { label: "Classic Pedicure", price: "€40" },
      { label: "Medical Foot Care", price: "€60" },
      { label: "Callus & Nail Treatment", price: "€35" },
    ],
  },
  {
    name: "Hand care",
    items: [
      { label: "Classic Manicure", price: "€35" },
      { label: "Gel Manicure", price: "€50" },
      { label: "Paraffin Hand Treatment", price: "€25" },
    ],
  },
  {
    name: "Waxing",
    items: [
      { label: "Eyebrow / Lip", price: "€12" },
      { label: "Half Leg", price: "€28" },
      { label: "Full Leg", price: "€45" },
    ],
  },
];

// CONFIRM: fabricated placeholder quotes — swap for real client testimonials
// once the studio has some to share. Eight rather than three so the "wall
// of love" marquee in Testimonials.tsx has enough to loop convincingly.
export const testimonials = [
  {
    quote:
      "I've never had a facial that actually listened to what my skin needed. Sobi noticed things other places missed.",
    name: "Anna K.",
    service: "Skincare client",
  },
  {
    quote:
      "Thorough, gentle, and exactly on time every visit. My feet have never felt this looked after.",
    name: "Markus R.",
    service: "Foot care client",
  },
  {
    quote:
      "Tyra's attention to detail is unreal — clean lines, no rush, and my hands look better a month later.",
    name: "Priya S.",
    service: "Hand care client",
  },
  {
    quote: "Fifteen years going and I still look forward to it. That says everything.",
    name: "Elisabeth W.",
    service: "Skincare client",
  },
  {
    quote: "Booked for a quick wax, stayed for the tea and conversation. Feels like family.",
    name: "Julia F.",
    service: "Waxing client",
  },
  {
    quote: "My mother recommended Sobi to me, now I recommend her to everyone I know.",
    name: "Nadia B.",
    service: "Hand care client",
  },
  {
    quote: "Careful, patient, and honestly the only place I trust with my feet anymore.",
    name: "Thomas G.",
    service: "Foot care client",
  },
  {
    quote: "Small studio, huge skill. You can tell they actually care about the result.",
    name: "Sara M.",
    service: "Skincare client",
  },
];

export const socialLinks = [
  { label: "Instagram", href: "#" }, // CONFIRM: real Instagram URL
  { label: "Facebook", href: "#" }, // CONFIRM: real Facebook URL
];

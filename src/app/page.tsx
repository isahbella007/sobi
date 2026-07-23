import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";

import { FindUs } from "@/components/sections/FindUs";
import { Book } from "@/components/sections/Book";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Pricing />
      <Testimonials />
      <FindUs />
      {/* <Book /> */}
      {/* <Footer /> */}
    </>
  );
}

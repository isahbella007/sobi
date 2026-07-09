import { Nav } from "@/components/nav/Nav";
import { BentoHero } from "@/components/bento/BentoHero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { FindUs } from "@/components/sections/FindUs";
import { Book } from "@/components/sections/Book";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <BentoHero />
      <About />
      <Services />
      <FindUs />
      <Book />
      <Footer />
    </>
  );
}

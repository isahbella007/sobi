import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { FindUs } from "@/components/sections/FindUs";
import { Book } from "@/components/sections/Book";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      {/* <About /> */}
      <Services />
      <FindUs />
      <Book />
      <Footer />
    </>
  );
}

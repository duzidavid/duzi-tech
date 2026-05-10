import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Products } from '@/components/Products';
import { AiDemo } from '@/components/AiDemo';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Products />
        <AiDemo />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

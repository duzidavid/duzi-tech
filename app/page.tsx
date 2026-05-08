import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { About } from '@/components/About';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
      </main>
    </>
  );
}

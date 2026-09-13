import { useEffect } from 'react';
import Hero from './Hero';
import Navbar from './Navbar';
import ScrubVideo from './ScrubVideo';

export default function MainframeLanding() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Mainframe®';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="relative min-h-screen" style={{ fontFamily: 'var(--font-body)', background: '#CAA683' }}>
      <ScrubVideo />
      <Navbar />
      <Hero />
      <p className="fixed inset-x-0 bottom-2 z-10 px-5 text-center text-[12px] whitespace-nowrap text-black/70 md:inset-x-auto md:left-10 md:bottom-5 md:px-0 md:text-left md:text-[13px]">
        Concept by Alankrit Srivastava<span className="hidden md:inline">, not a real agency</span> ·{' '}
        <a href="#/" className="underline underline-offset-2 hover:text-black">
          Back to portfolio
        </a>
      </p>
    </div>
  );
}

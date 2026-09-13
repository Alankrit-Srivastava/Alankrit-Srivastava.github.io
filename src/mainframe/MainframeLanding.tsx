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
    </div>
  );
}

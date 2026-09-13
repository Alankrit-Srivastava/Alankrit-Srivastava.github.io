import { Fragment, useEffect, useState } from 'react';

const LINKS = ['Labs', 'Studio', 'Openings', 'Shop'] as const;
const CONTACT_HREF = 'mailto:hello@mainframe.co';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Escape closes the mobile menu; widening past md closes it too.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        {/* Logo */}
        <a href="#/mainframe" className="flex items-center gap-3 text-black" aria-label="Mainframe, home">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Mainframe®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-black select-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex text-[23px] text-black" aria-label="Primary">
          {LINKS.map((label, index) => (
            <Fragment key={label}>
              <a href="#/mainframe" className="hover:opacity-60 transition-opacity">
                {label}
              </a>
              {index < LINKS.length - 1 && <span className="whitespace-pre">, </span>}
            </Fragment>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={CONTACT_HREF}
          className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mainframe-mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`}
          />
          <span className={`block w-6 h-[2px] bg-black transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}
          />
        </button>
      </header>

      {/* Mobile overlay */}
      <div
        id="mainframe-mobile-menu"
        className="fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        aria-hidden={!open}
        inert={!open}
      >
        {LINKS.map((label) => (
          <a key={label} href="#/mainframe" onClick={close} className="text-[32px] font-medium text-black">
            {label}
          </a>
        ))}
        <a href={CONTACT_HREF} onClick={close} className="text-[32px] font-medium text-black underline">
          Get in touch
        </a>
      </div>
    </>
  );
}

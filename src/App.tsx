import { useEffect, useRef, useState } from 'react';
import Portfolio from './portfolio/Portfolio';
import MainframeLanding from './mainframe/MainframeLanding';
import { MAINFRAME_HREF } from './shared/routes';

type Route = 'portfolio' | 'mainframe';

function readRoute(): Route {
  return window.location.hash.startsWith(MAINFRAME_HREF) ? 'mainframe' : 'portfolio';
}

export default function App() {
  const [route, setRoute] = useState<Route>(readRoute);
  const routeRef = useRef<Route>(route);
  const portfolioScrollY = useRef(0);

  useEffect(() => {
    const onHashChange = () => {
      const next = readRoute();
      if (next === routeRef.current) return;
      // Remember where the visitor was, so Back from the demo returns them to the same spot.
      if (routeRef.current === 'portfolio') portfolioScrollY.current = window.scrollY;
      routeRef.current = next;
      setRoute(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (route === 'mainframe') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const id = window.location.hash.slice(1);
    const section = id && !id.startsWith('/') ? document.getElementById(id) : null;
    if (section) section.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: portfolioScrollY.current, behavior: 'instant' });
  }, [route]);

  return route === 'mainframe' ? <MainframeLanding /> : <Portfolio />;
}

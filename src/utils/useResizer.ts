import { useState, useEffect } from 'react';

const BREAKPOINT = 800;

export default function useResizer() {
  const [screenDimensions, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < BREAKPOINT
  });
  useEffect(() => {
    const handleSizeChange = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < BREAKPOINT
      });
    };
    window.addEventListener('resize', handleSizeChange);
    return () => {
      window.removeEventListener('resize', handleSizeChange);
    };
  }, []);
  return screenDimensions;
}

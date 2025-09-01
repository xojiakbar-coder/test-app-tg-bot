import { useEffect, useState } from 'react';

export function useKeyboardStatus() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [initialHeight, _] = useState(window.innerHeight);

  useEffect(() => {
    const threshold = 150; // px o‘zgarish — bu klaviatura ochilganiga ishora

    const handleResize = () => {
      const heightDiff = initialHeight - window.innerHeight;
      setIsKeyboardOpen(heightDiff > threshold);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialHeight]);

  return isKeyboardOpen;
}

import { useEffect, useRef } from 'react';

export const useGameLoop = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id: number;
    
    function tick() {
      savedCallback.current();
      id = requestAnimationFrame(tick);
    }

    if (delay !== null) {
      id = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(id);
    }
  }, [delay]);
};
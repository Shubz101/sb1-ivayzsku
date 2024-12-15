import { useState, useEffect } from 'react';

export const useSoundEffects = () => {
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);
  const [winSound, setWinSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const clickAudio = new Audio('/api/placeholder/click-sound.mp3');
    const winAudio = new Audio('/api/placeholder/win-sound.mp3');
    setClickSound(clickAudio);
    setWinSound(winAudio);
  }, []);

  const playClickSound = () => clickSound?.play();
  const playWinSound = () => winSound?.play();

  return { playClickSound, playWinSound };
};
'use client';

import { forwardRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface BirdProps {
  isDefeated?: boolean;
  isPaused?: boolean;
}

const Bird = forwardRef<HTMLImageElement, BirdProps>(({ isDefeated, isPaused }, ref) => {
  const [position, setPosition] = useState(0);
  const [, setVelocity] = useState(5);
  const gravity = 0.9;
  const jumpForce = 8;
  const [bodyRotation, setBodyRotation] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setVelocity((v) => {
          const newV = v + gravity;
          setPosition((p) => p + newV);
          return newV;
        });

        setBodyRotation((r) => r + (20 - r) * 0.1);
      }, 50);
    } else
      return () => {
        if (intervalId) clearInterval(intervalId);
      };
  }, [isPaused]);

  useEffect(() => {
    const handleKeyPress = () => {
      if (!isPaused) {
        setBodyRotation(-20);
      }

      setVelocity((v) => {
        v = -jumpForce;
        return v;
      });
    };

    if (!isDefeated) {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isDefeated, isPaused]);

  return (
    <Image
      src="/assets/birdie.gif"
      height={36}
      width={48}
      alt="Bird"
      className="absolute top-[50%] left-[20%] z-40"
      style={{ transform: `translateY(${position}px) rotate(${bodyRotation}deg)` }}
      ref={ref}
    ></Image>
  );
});

Bird.displayName = 'Bird';
export default Bird;

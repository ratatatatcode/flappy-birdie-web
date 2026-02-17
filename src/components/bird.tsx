'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Bird() {
  const [position, setPosition] = useState(0);
  const [, setVelocity] = useState(5);
  const gravity = 0.9; // Falling rate
  const jumpForce = 8;
  const [bodyRotation, setBodyRotation] = useState(20);

  // velocity += gravity
  // position += velocity
  useEffect(() => {
    const intervalId = setInterval(() => {
      setVelocity((v) => {
        const newV = v + gravity;
        setPosition((p) => p + newV);
        return newV;
      });

      setBodyRotation((r) => r + (20 - r) * 0.1);
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  const handleKeyPress = () => {
    setBodyRotation(-20);
    setVelocity((v) => {
      v = -jumpForce;
      return v;
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <Image
      src="/assets/birdie.gif"
      height={36}
      width={48}
      alt="Bird"
      className="absolute top-[50%] left-[20%] z-40"
      style={{ transform: `translateY(${position}px) rotate(${bodyRotation}deg)` }}
    ></Image>
  );
}

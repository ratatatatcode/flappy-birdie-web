'use client';

import { useState, useEffect } from 'react';

export default function Pipe() {
  const randomGenerator = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const pipeSize = 100;
  const [pipes, setPipes] = useState(new Array(pipeSize));
  const [pipeMovement, setPipeMovement] = useState(0);

  useEffect(() => {
    const createPipeArr = async () => {
      setPipes(() => {
        return new Array(pipeSize).fill(null).map(() => {
          const y_pos = randomGenerator(-60, 160);
          // y_position, scored?
          return [y_pos, false];
        });
      });
    };

    createPipeArr();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPipeMovement((m) => m + 5);
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute left-full flex h-full w-full gap-40">
      {pipes.map((pipe, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center gap-38"
          style={{ transform: `translateX(-${pipeMovement}px)` }}
        >
          <img
            src={'/assets/top-pipe.png'}
            className="min-w-13"
            alt="Top Pipe"
            style={{ transform: `translateY(${pipe[0]}px)` }}
          />

          <img
            src={'/assets/bottom-pipe.png'}
            className="min-w-13"
            alt="Bottom Pipe"
            style={{ transform: `translateY(${pipe[0]}px)` }}
          />
        </div>
      ))}
    </div>
  );
}

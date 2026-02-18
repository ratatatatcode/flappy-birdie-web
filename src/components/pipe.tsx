'use client';

import { useState, useEffect, useRef } from 'react';

export default function Pipe({
  addScore,
  gameState,
  boardDisplay,
  birdRef,
  score,
  isPaused,
}: {
  addScore: () => void;
  gameState: () => void;
  boardDisplay: () => void;
  birdRef: React.RefObject<HTMLImageElement>;
  score: number;
  isPaused: boolean;
}) {
  const randomGenerator = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const [curr, setCurrent] = useState(0);
  const pipeSize = 100;
  const [pipes, setPipes] = useState(new Array(pipeSize));
  const [pipeMovement, setPipeMovement] = useState(0);
  const pipesRef = useRef<HTMLDivElement[]>([]);
  const topPipeRef = useRef<HTMLImageElement[]>([]);
  const bottomPipeRef = useRef<HTMLImageElement[]>([]);

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
    let intervalId: NodeJS.Timeout | null = null;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setPipeMovement((m) => m + 5);

        const currentPipeRect = pipesRef.current[curr].getBoundingClientRect();
        const birdRect = birdRef.current.getBoundingClientRect();
        const topPipeRect = topPipeRef.current[curr].getBoundingClientRect();
        const bottomPipeRect = bottomPipeRef.current[curr].getBoundingClientRect();

        if (currentPipeRect.x < birdRect.x - 35) {
          setCurrent((c) => c + 1);
          addScore();
        }

        if (
          (birdRect.x < topPipeRect.x + topPipeRect.width &&
            birdRect.x + birdRect.width > topPipeRect.x &&
            birdRect.y < topPipeRect.y + topPipeRect.height &&
            birdRect.y + birdRect.height > topPipeRect.y) ||
          (birdRect.x < bottomPipeRect.x + bottomPipeRect.width &&
            birdRect.x + birdRect.width > bottomPipeRect.x &&
            birdRect.y < bottomPipeRect.y + bottomPipeRect.height &&
            birdRect.y + birdRect.height > bottomPipeRect.y)
        ) {
          gameState();
          boardDisplay();
        }
      }, 50);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [curr, addScore, birdRef, score, isPaused, gameState]);

  return (
    <div className="absolute left-full flex h-full w-full gap-40">
      {pipes.map((pipe, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center gap-38"
          style={{ transform: `translateX(-${pipeMovement}px)` }}
          ref={(el) => {
            if (el) pipesRef.current[idx] = el;
          }}
        >
          <img
            src={'/assets/top-pipe.png'}
            className="min-w-13"
            alt="Top Pipe"
            style={{ transform: `translateY(${pipe[0]}px)` }}
            ref={(el) => {
              if (el) topPipeRef.current[idx] = el;
            }}
          />

          <img
            src={'/assets/bottom-pipe.png'}
            className="min-w-13"
            alt="Bottom Pipe"
            style={{ transform: `translateY(${pipe[0]}px)` }}
            ref={(el) => {
              if (el) bottomPipeRef.current[idx] = el;
            }}
          />
        </div>
      ))}
    </div>
  );
}

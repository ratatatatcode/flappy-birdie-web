'use client';

import { useState, useRef } from 'react';
import Canvas from './canvas';
import Score from './score';
import Bird from './bird';
import Pipe from './pipe';
import Board from './board';

export default function GameComponent() {
  const [score, setScore] = useState(0);
  const [isDefeated, setIsDefeated] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const birdRef = useRef<HTMLImageElement>(null!);

  return (
    <Canvas>
      <Score score={score} />
      <Bird ref={birdRef} isDefeated={isDefeated} isPaused={isPaused} />
      <Pipe
        birdRef={birdRef}
        score={score}
        isPaused={isPaused}
        addScore={() => setScore((s) => s + 1)}
        gameState={() => {
          setIsPaused(true);
          setIsDefeated(true);
        }}
        boardDisplay={() => setIsHidden(false)}
      />
      <Board score={score} isHidden={isHidden} />
    </Canvas>
  );
}

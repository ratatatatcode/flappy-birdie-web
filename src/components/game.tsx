'use client';

import { useState } from 'react';
import Canvas from './canvas';
import Score from './score';
import Bird from './bird';
import Board from './board';
import Pipe from './pipe';

export default function GameComponent() {
  const [score, setScore] = useState(0);

  return (
    <Canvas>
      <Board />
      <Score score={score} />
      <Bird />
      <Pipe addScore={() => setScore((s) => s + 1)} />
    </Canvas>
  );
}

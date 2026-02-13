'use client';

import Canvas from './canvas';
import Bird from './bird';
import Board from './board';

export default function GameComponent() {
  return (
    <Canvas>
      <Board />
      <Bird />
    </Canvas>
  );
}

import Canvas from './canvas';
import Bird from './bird';
import Board from './board';
import Pipe from './pipe';

export default function GameComponent() {
  return (
    <Canvas>
      <Board />
      <Bird />
      <Pipe />
    </Canvas>
  );
}

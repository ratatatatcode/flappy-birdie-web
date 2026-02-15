'use client';

import { useState } from 'react';

export default function Pipe() {
  const randomGenerator = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const pipeSize = 5;
  const [pipes] = useState(() => {
    return new Array(pipeSize).map(() => {
      const gap = 50;
      const fixed_h = 20;
      const top = randomGenerator(1, 350);
      const bottom = top - gap + fixed_h;

      // t_height: , b_height: , scored?:
      return [top, bottom, false];
    });
  });

  return (
    <div className="absolute h-full w-full overflow-hidden">
      {pipes.map((pipe, idx) => (
        <div key={idx} className="flex flex-col justify-between">
          {/* Top Pipe */}
          <div className="w-60 bg-green-600" style={{ height: `${pipe[0]}px` }}></div>

          {/* Bottom Pipe */}
          <div className="w-60 bg-green-600" style={{ height: `${pipe[1]}px` }}></div>
        </div>
      ))}
    </div>
  );
}

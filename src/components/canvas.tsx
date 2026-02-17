'use client';

import { ReactNode, useState } from 'react';

export default function Canvas({ children }: { children: ReactNode }) {
  const [score] = useState(0);

  return (
    <div className="relative z-10 h-128 w-100 overflow-hidden border-2 border-solid border-[#c1c2c4] bg-[url(/assets/bg.png)] bg-cover shadow-2xl shadow-[#0c0c0c]">
      {children}
      <div className="absolute mt-4 w-full text-center">
        <h2 className="text-3xl font-extrabold text-white">{score}</h2>
      </div>
    </div>
  );
}

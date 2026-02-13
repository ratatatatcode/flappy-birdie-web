import { ReactNode } from 'react';

export default function Canvas({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 h-128 w-100 overflow-hidden border-2 border-solid border-[#474951] bg-[url(/assets/bg.png)] bg-cover">
      {children}
    </div>
  );
}

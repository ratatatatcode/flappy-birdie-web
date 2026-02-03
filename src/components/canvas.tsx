import { ReactNode } from "react";

export default function Canvas({ children }: { children: ReactNode }) {
  return (
    <div className="h-128 w-100 bg-blue-300 relative overflow-hidden z-10 bg-[url(/assets/bg.png)] bg-cover">
      {children}
    </div>
  );
}

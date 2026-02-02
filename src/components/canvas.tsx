import { ReactNode } from "react";

export default function Canvas({ children }: { children: ReactNode }) {
  return (
    <div className="h-128 w-[288px] bg-[#4dbac6] relative overflow-hidden">
      {children}
    </div>
  );
}

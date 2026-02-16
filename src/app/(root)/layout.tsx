import React from 'react';
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#34424f] antialiased">
      {children}
    </div>
  );
}

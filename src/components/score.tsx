'use client';

export default function Score({ score }: { score: number }) {
  return (
    <div className="absolute z-60 mt-4 w-full text-center">
      <p className="text-stroke text-3xl font-extrabold text-white">{score}</p>
    </div>
  );
}

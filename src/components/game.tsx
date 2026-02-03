"use client";

import { useState, useEffect } from "react";
import Canvas from "./canvas";
import Image from "next/image";

const randomGenerator = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export default function GameComponent() {
  // Game Function:
  const [isPaused, setIsPaused] = useState(true);

  // Bird related movement:
  const [velocity, setVelocity] = useState(0);
  const gravity = 9;
  const [rotate, setRotate] = useState(0);

  // Pipe related:
  const [pipeMovement, setPipeMovement] = useState(0);
  // [upper-h (0), lower-h (1)]
  // (Inconsistent gap between pipes)
  const [pipeArr] = useState<number[][]>(() =>
    [...Array(100)].map(() => {
      const upper = randomGenerator(20, 400);
      const lower = 512 - upper - 150;
      return [upper, lower];
    }),
  );

  // Main Game Function:
  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        setVelocity((y) => y + gravity);
        setPipeMovement((x) => x - 6);
        setRotate((r) => r + (20 - r) * 0.1);
      }, 50);

      return () => clearInterval(intervalId);
    }
  }, [isPaused]);

  // Spacebar Movement:
  const handleKeyPress = (e: KeyboardEvent) => {
    setRotate(-20);
    setVelocity((y) => {
      if (e.key === " ") return y - 60;
      return y;
    });
  };

  useEffect(() => {
    if (!isPaused) window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPaused]);

  return (
    <Canvas>
      {/* Menu */}
      <div className="p-4 absolute">
        <h2 className="text-white">Score:</h2>
        {isPaused && (
          <button
            className="text-white border px-2"
            onClick={() => setIsPaused(false)}
          >
            Start
          </button>
        )}
      </div>

      {/* Player */}
      <Image
        src={"/assets/birdie.gif"}
        className={`absolute top-[50%] left-[20%] ease-in z-30`}
        style={{
          transform: `translateY(${velocity}px) rotate(${rotate}deg)`,
        }}
        alt="Flappy Birdie"
        height={36}
        width={48}
      />

      {/* Pipe */}
      <div
        className="flex gap-42 absolute left-full h-full w-full z-20"
        style={{ transform: `translateX(${pipeMovement}px)` }}
      >
        {pipeArr.map((pipe, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col justify-between right-[50%]"
            >
              {/* Upper pipe */}
              <div
                className={`w-18 bg-green-600`}
                style={{
                  height: `${pipe[0]}px`,
                }}
              >
                Upper
              </div>

              {/* Lower pipe */}
              <div
                className={`w-18 bg-green-600`}
                style={{
                  height: `${pipe[1]}px`,
                }}
              >
                Lower
              </div>
            </div>
          );
        })}
      </div>
    </Canvas>
  );
}

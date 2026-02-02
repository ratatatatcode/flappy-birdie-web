"use client";

import { useState, useEffect } from "react";
import Canvas from "./canvas";
import Image from "next/image";

export default function GameComponent() {
  const [velocity, setVelocity] = useState(0);
  const gravity = 8;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVelocity((y) => y + gravity);
    }, 50);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleKeyPress = (e: KeyboardEvent) => {
    setVelocity((y) => {
      if (e.key === " ") return y - 50;
      return y;
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Canvas>
      <Image
        src={"/assets/birdie.gif"}
        className={`absolute top-[50%] left-[20%] ease-in`}
        style={{ transform: `translateY(${velocity}px)` }}
        alt="Flappy Birdie"
        height={144}
        width={64}
      />
      <h2>Position Y: {velocity}</h2>
    </Canvas>
  );
}

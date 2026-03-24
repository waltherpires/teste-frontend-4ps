"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { images } from "@/src/util/images-data";
import { useBg } from "@/src/context/bg-context";
import { ReactNode } from "react";

const SLIDE_DURATION = 30000;
const FADE_DURATION = 1000;

function getRandomIndex(current: number, max: number) {
  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * max);
  }
  return next;
}



export default function BackgroundSlider({ children }: { children: ReactNode }) {
  const { index, setIndex } = useBg();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setIndex((prev) => getRandomIndex(prev, images.length));
        setOpacity(1);
      }, FADE_DURATION);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [setIndex]);

  return (
    <div className="container-style">
      <Image
        src={images[index]}
        alt="background"
        fill
        className="bg-image"
        style={{ opacity }}
      />
      <div className="content">{children}</div>
    </div>
  );
}


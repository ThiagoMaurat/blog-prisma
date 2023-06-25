"use client";
import lottie from "lottie-web";
import React, { useEffect, useRef, useState } from "react";
import animation from "../../../public/animation.json";

export const Lottie = () => {
  const containerRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!containerRef.current) {
      return;
    }

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation,
    });

    anim.addEventListener("DOMLoaded", () => {
      setIsLoading(false);
    });

    return () => {
      anim.destroy(); // Limpa a animação quando o componente é desmontado
    };
  }, [containerRef]);
  return (
    <div className="flex justify-center items-center">
      {isLoading && (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
        </div>
      )}
      <div ref={containerRef}></div>
    </div>
  );
};

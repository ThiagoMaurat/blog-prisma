"use client";
import React from "react";
import animation from "../../public/animation.json";
import { useLottie } from "lottie-react";

export const Lottie = () => {
  const options = {
    animationData: JSON.parse(JSON.stringify(animation)),
    loop: true,
  };

  const { animationLoaded, View } = useLottie(options);

  return (
    <div className="flex justify-center items-center">
      {!animationLoaded && (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
        </div>
      )}
      <div>{View}</div>
    </div>
  );
};

export default Lottie;

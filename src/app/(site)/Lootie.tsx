"use client";
import Lottie from "lottie-react";
import React from "react";
import animation from "../../../public/animation.json";

export default function Lootie() {
  return <Lottie animationData={animation} loop />;
}

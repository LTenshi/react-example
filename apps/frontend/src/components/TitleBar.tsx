import React, { useState, useEffect } from "react";
import UiBox from "@/components/UiBox";

export default function TitleBar() {
  const others = ["Next.js", "Nest.js", "Turbo"]
  const [activeIndex, setActiveIndex] = useState(0);

  //Purely here to showcase useEffect use
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex > others.length - 2) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 1000)

    return () => clearInterval(interval);
  })

  return (
    <div className="flex">
      <UiBox className="mr-2 flex-1/2">
        <div className="p-2 text-xl font-medium text-black dark:text-white">Welcome to my React ({others[activeIndex]}) app!</div>
      </UiBox>
      <UiBox className="flex-1/2">
        <div className="p-2 text-xl font-medium text-black dark:text-white">At the moment it showcases I <a className="blink">can</a> work with React</div>
      </UiBox>
    </div>
  )
}
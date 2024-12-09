import React from "react";
import { SparklesIcon } from "./Icons";

export const LoadingBubble = () => {
  return (
    <>
      <div className="flex p-2  md:px-[5.5rem] gap-2 items-center">
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-gray-600">
          <SparklesIcon />
        </div>
        <div className="w-4 h-4 rounded-full bg-gray-600 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-gray-500 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-gray-600 animate-bounce [animation-delay:.7s]"></div>
      </div>
    </>
  );
};


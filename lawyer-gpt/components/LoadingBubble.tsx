import React from "react";

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

export const SparklesIcon = () => (
  <svg
    height={16}
    fill="#fff"
    width={16}
    viewBox="0 0 512 512"
    id="icons"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M208,512,155.62,372.38,16,320l139.62-52.38L208,128l52.38,139.62L400,320,260.38,372.38Z" />
    <path d="M88,176,64.43,111.57,0,88,64.43,64.43,88,0l23.57,64.43L176,88l-64.43,23.57Z" />
    <path d="M400,256l-31.11-80.89L288,144l80.89-31.11L400,32l31.11,80.89L512,144l-80.89,31.11Z" />
  </svg>
);

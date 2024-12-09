import React from "react";
import { Links } from "./Navbar";

const PromtSuggestions = ({
  onPromptClick,
}: {
  onPromptClick: (prompt: string) => void;
}) => {
  const prompts = [
    "what to do If someone files a false case against me in India ?",
    "For how many years a person has to be a High Court judge to become a Supreme Court Judge ?",
  ];

  return (
    <>
      <div className="md:px-10 h-full flex flex-col justify-around items-center ">
        <div className=" my-10 flex flex-col gap-5 justify-center items-center text-center">
          <p className="p-1 font-mono text-5xl">🤵 AI Lawyer</p>
          <p className="p-1 md:text-2xl text-xl leading-10">
            {" "}
            Get quick, insightful answers to your law-related questions with our
            AI-powered legal assistant, offering convenient legal insights at
            your fingertips.
          </p>
        <Links/>
        </div>


        <div className=" grid grid-cols-2 gap-2 w-full">
          {prompts.map((prompt, index) => (
            <div className="w-full grid row-span-1 overflow-hidden" key={index}>
              <button
                className="flex font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 hover:bg-white/15 hover:border-transparent text-left border border-white/15 rounded-xl px-4 py-3.5 text-base flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
                onClick={() => onPromptClick(prompt)}
              >
                <span className="font-medium">{prompt}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PromtSuggestions;

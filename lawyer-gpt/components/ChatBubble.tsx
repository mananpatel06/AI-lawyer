import React from "react";
import { Message } from "ai";
import ReactMarkdown from "react-markdown";
import { SparklesIcon } from "./Icons";

const ChatBubble = ({ message }: { message: Message }) => {
  const { content, role } = message;

  return (
    <div
      className="w-full p-2 md:px-20 flex  items-center   group/message"
      data-role={role} //user or assistant
    >
      <div className="group-data-[role=user]/message:bg-[#00407b] text-white flex gap-4 p-2 w-fit group-data-[role=user]/message:ml-auto max-w-[90%]  rounded-xl">
        <div className="group-data-[role=user]/message:hidden size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-gray-600">
          <SparklesIcon />
        </div>

        <div className="flex flex-col w-full gap-3">
        <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

    </div>
  );
};

export default ChatBubble;

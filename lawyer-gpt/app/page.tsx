"use client";

import ChatBubble from "@/components/ChatBubble";
import { LoadingBubble } from "@/components/LoadingBubble";
import PromtSuggestions from "@/components/PromtSuggestions";
import { useChat } from "ai/react";
import { Message } from "ai";
import { useEffect, useRef } from "react";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";

export default function Home() {
  const {
    append,
    isLoading,
    messages,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat();

  const noMessage = !messages || messages.length === 0;
  const [messageStartRef, messageEndRef] = useScrollToBottom();

  const handleClient = (prompt: string) => {
    const msg: Message = {
      id: crypto.randomUUID(),
      content: prompt,
      role: "user",
    };

    append(msg);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 2
      }px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleInputChange(e);
    adjustHeight();
  };

  return (
    <>
      <main className="w-[100vw] h-[100vh] py-2 flex items-center flex-col ">
        {!noMessage && (
          <nav className="p-1 font-mono text-2xl ">🤵 AI Lawyer</nav>
        )}

        <div
          className="flex flex-col  items-center justify-start w-full md:px-10 flex-1             overflow-y-scroll "
          ref={messageStartRef}
        >
          <div className="w-[95%] h-full relative">
            {noMessage ? (
              <div className="h-full">
                {/* Promt suggestions row */}
                <PromtSuggestions onPromptClick={handleClient} />
              </div>
            ) : (
              <div>
                {messages.map((message, index) => (
                  <ChatBubble key={`message-${index}`} message={message} />
                ))}
              </div>
            )}

            {isLoading && messages[messages.length - 1].role === "user" && (
              <LoadingBubble />
            )}
            <div ref={messageEndRef} className="w-1 h-0 bg-red-700"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-[95%] md:px-10 p-2 flex ">
          <textarea
            className="flex bg-[#27272A] w-full px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-xl text-base"
            placeholder="Send a message..."
            rows={3}
            ref={textareaRef}
            autoFocus
            value={input}
            onChange={handleInput}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();

                if (isLoading) {
                  alert("Please wait for the model to finish its response!");
                } else {
                  handleSubmit();
                }
              }
            }}
          ></textarea>
        </form>
        <p className="opacity-40 text-xs w-full px-1 text-center">
          Disclaimer: AI content may be inaccurate, please verify information
          from reliable sources.
        </p>
      </main>
    </>
  );
}

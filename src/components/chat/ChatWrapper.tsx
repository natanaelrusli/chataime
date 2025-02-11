"use client";

import React, { useState } from "react";
import Messages from "./Messages";
import ChatInput from "@/components/ChatInput";

export type Message = {
  role: string;
  content: string;
};

type OllamaResponse = {
  model: string;
  created_at: string; // or Date if you want to parse it
  message: Message;
  done: boolean;
  done_reason: string;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
};

const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>("");

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const cleanContent = (content: string) =>
    content.replace(/<\/?think>/gi, "").trim();

  const handleSubmit = async () => {
    const newMessage: Message = { role: "user", content: input };

    setMessages((prev) => [...prev, newMessage]);

    try {
      const res = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-r1",
          stream: false,
          messages: [newMessage],
        }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

      const data: OllamaResponse = await res.json();
      const botMessage: Message = {
        role: data.message.role,
        content: cleanContent(data.message.content),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className='relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2'>
      <p className='text-white'>{sessionId}</p>

      <div className='flex-1 text-white bg-zinc-800 justify-between flex flex-col'>
        <Messages messages={messages} />
      </div>

      <ChatInput
        handleInputChange={(e) => handleInputChange(e)}
        input={input}
        handleSubmit={handleSubmit}
        setInput={setInput}
      />
    </div>
  );
};

export default ChatWrapper;

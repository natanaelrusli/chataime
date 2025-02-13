"use client";

import React, { useState } from "react";
import Messages from "./Messages";
import ChatInput from "@/components/ChatInput";
import { cleanContent } from "@/lib/utils";
import { Message } from "@/type";
import { RoleEnum } from "@/types/enums";
import { Button } from "@heroui/react";
import {BotIcon, Copy} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const ChatWrapper = ({
  sessionId,
  initialMessages,
  fullName,
}: {
  sessionId: string;
  initialMessages: Message[];
  fullName: string;
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>("");
  const [currentModel, setCurrentModel] = useState<string>("deepdeek-r1");

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (!input) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:9090/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Transfer-Encoding": "chunked",
        },
        body: JSON.stringify({
          model: "deepseek-r1",
          messages: [newMessage],
        }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
      if (!res.body) throw new Error("No response body received.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = "";

      setMessages((prev) => [
        ...prev,
        { role: RoleEnum.Assistant, content: "" },
      ]);

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process each full line (NDJSON format)
        // NDJSON = Newline Delimited JSON
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? ""; // Keep unfinished data for next iteration

        for (const line of lines) {
          if (!line.trim()) continue; // Skip empty lines

          try {
            const jsonData = JSON.parse(line);
            if (jsonData.message?.content) {
              botMessage += jsonData.message.content;
            }

            setMessages((prev) => {
              const updatedMessages = [...prev];
              updatedMessages[updatedMessages.length - 1] = {
                role: RoleEnum.Assistant,
                content: cleanContent(botMessage),
              };
              return updatedMessages;
            });
          } catch (err) {
            console.error("JSON Parse Error:", err);
          }
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className='relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2'>
      <div className='w-full py-4 px-14 flex items-center justify-between font-bold h-full mt-1'>
        <div className='flex flex-col items-start gap-3'>
          <div className='flex justify-center items-center gap-2'>
            <UserButton />
            {fullName}
          </div>
          <div className='flex gap-3 items-center text-gray-500'>
            <p className='text-xs'>{sessionId}</p>
            <Copy className='size-3 cursor-pointer' />
          </div>
        </div>

        <div>
          <Button
            size='sm'
            variant='solid'
            className='bg-zinc-500 text-white'
            onPress={() => setCurrentModel("qwen")}
          >
            <BotIcon className='size-5 flex items-center' />
            {currentModel}
          </Button>
        </div>
      </div>

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

import ChatWrapper from "@/components/chat/ChatWrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ChatAIme - Chat",
};

const Page = async () => {
  return (
    <ChatWrapper
      initialMessages={[
        {
          role: "user",
          content: "WOW",
        },
        {
          role: "bot",
          content: "Hello",
        },
      ]}
      sessionId={"sessionId"}
    />
  );
};

export default Page;

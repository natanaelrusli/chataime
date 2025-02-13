import ChatWrapper from "@/components/chat/ChatWrapper";
import {currentUser} from "@clerk/nextjs/server";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ChatAIme - Chat",
};

const Page = async () => {
  const user = await currentUser();

  return (
    <div className='h-full'>
      <ChatWrapper
        fullName={user?.fullName || ""}
        initialMessages={[]}
        sessionId={"sessionId"}
      />
    </div>
  );
};

export default Page;

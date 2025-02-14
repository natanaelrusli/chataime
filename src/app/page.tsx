import ChatWrapper from "@/components/chat/ChatWrapper";
import {currentUser} from "@clerk/nextjs/server";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ChatAIme - Chat",
};

// How to create the sessionID?
// Make the sessionID dependant to the email?
// Then, how do i get the logged in email? or perhaps user ID?

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

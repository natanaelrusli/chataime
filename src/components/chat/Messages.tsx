import React from "react";
import Message from "./Message";
import {MessageSquare} from "lucide-react";
import {Message as TMessage} from "@/type";
import {Spinner} from "@heroui/react";

type MessagesProps = {
  messages: TMessage[];
  loading?: boolean;
};

const Messages = ({messages, loading}: MessagesProps) => {
  return (
    <div className='relative flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto pb-10 xl:pb-12'>
      {messages.length ? (
        messages.map((message, i) => (
            <Message
              key={`message-${i}`}
              content={message.content}
              isUserMessage={message.role === "user"}
            />
        ))
      ) : (
        <div className='flex-1 flex flex-col items-center justify-center gap-2'>
          <MessageSquare className='size-8 text-blue-500'/>
          <h3 className='font-semibold text-xl'>You are all set!</h3>
          <p className='text-zinc-500 text-sm'>
            Ask your first question to gt sarted.
          </p>
        </div>
      )}
      {loading && <Spinner color="default" label="Thinking..." labelColor="foreground"/>}
      <div id='messages-bottom'/>
    </div>
  );
};

export default Messages;

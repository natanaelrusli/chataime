import React from "react";
import Markdown from 'react-markdown';
import {cn} from "@/lib/utils";
import {Bot, User} from "lucide-react";
import remarkGfm from 'remark-gfm';

type MessageProps = {
  content: string;
  isUserMessage: boolean;
};

const Message = ({content, isUserMessage}: MessageProps) => {
  return (
    <div
      className={cn({
        "bg-zinc-800": isUserMessage,
        "bg-zinc-900/25": !isUserMessage,
      })}
    >
      <div className='p-6'>
        <div className='max-w-3xl mx-auto flex items-start gap2.5'>
          <div
            className={cn(
              "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-700 flex justify-center items-center",
              {
                "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage,
              }
            )}
          >
            {isUserMessage ? <User/> : <Bot/>}
          </div>
          <div className='flex flex-col ml-6 w-full'>
            <div className='flex flex-col items-start'>
              <span className='text-sm font-semibold text-white'>
                {isUserMessage ? "You" : "Bot"}
              </span>
              <div className='markdown-content'>
                <Markdown remarkPlugins={[remarkGfm]}>
                  {content}
                </Markdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

import ChatWrapper from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import React from "react";

type PageProps = {
  params: {
    url: string | string[] | undefined;
  };
};

function reconstructUrl({ url }: { url: string[] }) {
  return url.map((component) => decodeURIComponent(component)).join("/");
}

const Page = async ({ params }: PageProps) => {
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] });
  const sessionCookie = cookies().get("sessionId")?.value;
  const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(
    /\//g,
    ""
  );
  const initialMessages = await ragChat.history.getMessages({
    sessionId,
    amount: 10,
  });

  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    reconstructedUrl
  );

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: {
        chunkOverlap: 50,
        chunkSize: 200,
      },
    });

    await redis.sadd("indexed-urls", reconstructedUrl);
  }

  return (
    <ChatWrapper initialMessages={initialMessages} sessionId={sessionId} />
  );
};

export default Page;

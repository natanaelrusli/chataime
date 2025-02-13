import React from "react";
import { Button } from "@heroui/react";
import { Bot, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to ChatAIme - Login",
};

const Login = () => {
  return (
    <>
      <Link
        href='/chat'
        className='absolute top-10 left-8 flex gap-3 items-center cursor-pointer'
      >
        <ChevronLeft className='size-10 text-foreground-100' />
        Back to chat
      </Link>
      <div className='p-6 text-white flex flex-col justify-center items-center gap-2'>
        <Bot className='size-20' />
        <h1 className='text-3xl font-bold'>
          Welcome to chat
          <span className='font-extrabold text-secondary'>AI</span>
          me
        </h1>

        <div className='my-4 flex justify-center flex-col items-center gap-2'>
          <p className='text-foreground-200 font-semibold'>Sign in below</p>
          <SignInButton>
            <Button
              size='lg'
              radius='sm'
              className='px-24 bg-[#1f1f1f] text-white border-1 border-gray-700'
            >
              Continue with Gooogle
            </Button>
          </SignInButton>
        </div>

        <div className='mt-1'>
          <p className='text-foreground-500 text-sm'>
            By loging in, you agree to our{" "}
            <span className='font-extrabold'>
              <Link href={"/"}>terms of service</Link>
            </span>{" "}
            and{" "}
            <span className='font-extrabold'>
              <Link href={"/"}>privacy policy</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

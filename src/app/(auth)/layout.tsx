import React, { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <header className='flex justify-end items-center p-4 gap-4 h-16'></header>
      {children}
    </main>
  );
};

export default Layout;

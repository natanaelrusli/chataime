import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className='w-screen h-screen bg-[#121212] flex justify-center items-center'>
      {children}
    </main>
  );
};

export default Layout;

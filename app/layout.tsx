'use client'
import React from "react";
import {Provider} from "react-redux";
import {store} from '@/app/store/store'
import '@/app/style/tailwind.css'
import {Toaster} from "@/shared/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={'max-w-[1920px] mx-auto dark'}>
          {children}
          <Toaster/>
       </body>
      </Provider>
    </html>
  );
}

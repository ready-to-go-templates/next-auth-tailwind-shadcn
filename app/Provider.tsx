"use client";
import { ThemeProvider } from "@components/theme-provider";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

interface ProviderProps extends PropsWithChildren {
  session: Session;
}

const Provider = ({ children, session }: ProviderProps) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;

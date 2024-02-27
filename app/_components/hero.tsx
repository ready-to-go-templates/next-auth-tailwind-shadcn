"use client";
import React from "react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@components/ui/button";

type Props = {
  session: any;
};

const Hero = ({ session }: Props) => {
  const isLoggedIn = !!session?.user?.email;
  return (
    <div className="my-0 mx-20 p-4 px-6 border-white bg-muted rounded-lg shadow-md">
      {isLoggedIn && session?.user?.email}
      {isLoggedIn ? (
        <Button onClick={() => signOut()}>Log out</Button>
      ) : (
        <>
          {" "}
          <Button onClick={() => signIn("google")}>Login with Google</Button>
          <Button onClick={() => signIn("github")}>Login with Github</Button>
        </>
      )}
    </div>
  );
};

export default Hero;

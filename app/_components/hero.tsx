"use client";
import React from "react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@components/ui/button";
import { useToast } from "@components/ui/use-toast";

type Props = {
  session: any;
};

const Hero = ({ session }: Props) => {
  const isLoggedIn = !!session?.user?.email;
  const { toast, dismiss, toasts } = useToast();

  const handleToast = () => {
    toast({
      value: "toast 1",
      title: "Testing toast with successive variant",
      variant: "successive",
      // color: ''
    });
  };
  return (
    <div className="my-0 mx-20 p-4 px-6 border-white bg-muted rounded-lg shadow-md">
      {isLoggedIn && session?.user?.email}
      {isLoggedIn ? (
        <Button onClick={() => signOut()}>Log out</Button>
      ) : (
        <>
          <Button onClick={() => signIn("google")}>Login with Google</Button>
          <Button onClick={() => signIn("github")}>Login with Github</Button>
        </>
      )}
    </div>
  );
};

export default Hero;

"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Separator } from "@components/ui/separator";
import { ILoginEntity } from "../auth.interface";
import { loginSchema } from "../schema";
import Link from "next/link";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });

  const isAuthenticated = session.status === "authenticated";
  if (isAuthenticated) {
    redirect("/");
  }

  const onSubmit: SubmitHandler<ILoginEntity> = async (data) => {
    const { email, password } = data;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.status === 401) {
      alert("Invalid Credentials");
    }
    if (res?.ok) {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100svh]">
      <form
        className="justify-center block w-1/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("email", { required: true })}
          error={errors.email?.message}
          placeholder="Enter Email"
          name="email"
          label="Email"
          type="email"
          className="mb-2 text-lg"
        />
        <Input
          {...register("password", { required: true })}
          error={errors.password?.message}
          placeholder="Enter Password"
          type="password"
          name="userPassword"
          label="password"
          className="mb-2 text-lg"
        />
        <div className="flex items-center justify-between">
          <Link className="underline" href="/register">
            Don't have an account?
          </Link>
          <Link className="underline" href="/forgot-password">
            Forgot password?
          </Link>
        </div>
        <div className="mt-4">
          <Button size="lg" className="w-full text-lg" type="submit">
            Login
          </Button>
          <Separator className="my-4 bg-gray-400" />
          <Button
            type="button"
            size="lg"
            className="w-full mb-2 flex items-center gap-2 text-lg"
            onClick={() => signIn("google")}
          >
            {" "}
            <FcGoogle size="1.6rem" /> Login with Google
          </Button>
          <Button
            type="button"
            size="lg"
            className="w-full flex items-center gap-2 text-lg"
            onClick={() => signIn("github")}
          >
            {" "}
            <FaGithub size="1.6rem" /> Login with GitHub
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;

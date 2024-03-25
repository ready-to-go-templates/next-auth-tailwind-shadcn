"use client";
import React, { PropsWithChildren } from "react";
import Footer from "@components/partials/Footer";
import Navbar from "@components/partials/Navbar";

interface WrapperProps extends PropsWithChildren {}

const Wrapper = ({ children }: WrapperProps) => {
  const partialRoutes = ["/login", "/register", "/profile"];
  const currrentPath = window.location.pathname;

  return (
    <>
      {!partialRoutes.includes(currrentPath) && <Navbar />}
      {children}
      {!partialRoutes.includes(currrentPath) && <Footer />}
    </>
  );
};

export default Wrapper;

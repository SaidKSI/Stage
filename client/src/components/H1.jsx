import React from "react";

export default function H1({  children }) {
  return (
    <h1 className={` text-lg  text-[#0ea5e9] underline `}>
      {children}
    </h1>
  );
}

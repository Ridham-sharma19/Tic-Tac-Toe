
"use client"

import { useState } from "react"

import Block  from "../components/Block";

export default function Home() {
  const [state,setState]=useState(Array(9).fill(null))
  return (
    <div className="h-screen gap-1 w-screen   flex items-center justify-center flex-col">
      <div className=" flex gap-1 items-center justify-center">
        <Block/>
        <Block/>
        <Block/>
      </div>
      <div className=" flex gap-1 items-center justify-center">
        <Block/>
        <Block/>
        <Block/>
      </div>
      <div className=" flex gap-1 items-center justify-center">
        <Block/>
        <Block/>
        <Block/>
      </div>
     

    </div>
  );
}

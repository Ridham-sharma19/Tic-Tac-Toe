"use client"

import { useState } from "react"
import Block from "../components/Block";
import FallingBallsBackground from '../components/Background';

export default function Home() {
  const [state, setState] = useState(Array(9).fill(null));
  const [turnx, setTurnx] = useState(true);

  const winChecker = () => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],  // Fixed: was [0.3,6] which is invalid
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return true;
      }
    }
    return false;
  };
  const iswinner=winChecker()

  const handleBlock = (index: number) => {
   const CopyState=[...state];
   CopyState[index]=turnx?"X":"O"
   setState(CopyState);
   setTurnx(!turnx)

  };

  function handleReset(){
    setState(Array(9).fill(null))
  }

 return (
  <div className="h-screen gap-1 w-screen flex items-center justify-center flex-col">
    {iswinner ? (<>
  <div className="text-2xl font-bold text-green-600">
    {turnx ? "O" : "X"} won the game!
  </div>
  <button onClick={handleReset} className="bg-black text-xl text-white px-6 py-3 rounded-4xl mt-3">Reset</button></>
) :(
      <>
        <div className="flex gap-1 items-center justify-center">
          <Block onClick={() => handleBlock(0)} value={state[0]} />
          <Block onClick={() => handleBlock(1)} value={state[1]} />
          <Block onClick={() => handleBlock(2)} value={state[2]} />
        </div>
        <div className="flex gap-1 items-center justify-center">
          <Block onClick={() => handleBlock(3)} value={state[3]} />
          <Block onClick={() => handleBlock(4)} value={state[4]} />
          <Block onClick={() => handleBlock(5)} value={state[5]} />
        </div>
        <div className="flex gap-1 items-center justify-center">
          <Block onClick={() => handleBlock(6)} value={state[6]} />
          <Block onClick={() => handleBlock(7)} value={state[7]} />
          <Block onClick={() => handleBlock(8)} value={state[8]} />
        </div>
      </>
    )}
  </div>
) }
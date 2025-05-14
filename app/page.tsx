"use client"

import { useState } from "react"
import Block from "../components/Block";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision"

export default function Home() {
  const [state, setState] = useState(Array(9).fill(null));
  const [turnx, setTurnx] = useState(true);

  const winChecker = () => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
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

  const iswinner = winChecker();

  const handleBlock = (index: number) => {
    // Prevent filling an already-filled block or continuing after win
    if (state[index] !== null || iswinner) return;

    const CopyState = [...state];
    CopyState[index] = turnx ? "X" : "O";
    setState(CopyState);
    setTurnx(!turnx);
  };

  function handleReset() {
    setState(Array(9).fill(null));
    setTurnx(true);
  }

  return (
    <BackgroundBeamsWithCollision className="h-screen w-screen gap-3 flex items-center justify-center flex-col px-4">
      {iswinner ? (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-3xl sm:text-4xl mb-4 font-bold bg-gradient-to-r from-purple-600 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            {turnx ? "O" : "X"} won the Game !!
          </div>
          <button
            onClick={handleReset}
            className="bg-slate-400 text-lg sm:text-xl text-white px-4 py-2 rounded-3xl shadow-lg hover:bg-green-800 transition-all duration-300 transform hover:scale-105"
          >
            Reset
          </button>
        </div>
      ) : (
        <>
          <div className="text-4xl sm:text-6xl mb-6 sm:mb-10 font-bold bg-gradient-to-r from-purple-600 via-purple-400 to-pink-500 bg-clip-text text-transparent text-center">
            Tic Tac Toe
          </div>
          <div className="grid grid-cols-3 gap-[2px] sm:gap-2">
            {state.map((val, idx) => (
              <Block key={idx} onClick={() => handleBlock(idx)} value={val} />
            ))}
          </div>
        </>
      )}
    </BackgroundBeamsWithCollision>
  );
}

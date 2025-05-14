import React from 'react'


interface BlockProps {
  value: string | null;
  onClick?:()=>void
  
}

export default function Block({ value,onClick }: BlockProps) {
  return (
    <div onClick={onClick} className="border-2 text-6xl text-white  border-slate-600 w-20 h-20 flex items-center justify-center font-bold hover:scale-110 transition-all cursor-pointer">
      {value}
    </div>
  );
}

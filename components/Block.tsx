import React from 'react'


interface BlockProps {
  value: string | null;
  onClick?:()=>void
  
}

export default function Block({ value,onClick }: BlockProps) {
  return (
    <div onClick={onClick} className="border-2 text-3xl  border-black w-20 h-20 flex items-center justify-center font-bold">
      {value}
    </div>
  );
}

import React from "react";

interface Card {
  Icon: React.ElementType;
  text: string;
  value: number | string;
}

export default function Card({ Icon, text, value }: Card) {
  return (
    <div className="bg-green-900 text-white p-4 flex gap-2 rounded ">
      <Icon className="self-start justify-self-start text-xl text-white" />
      <div>
        <p className="text-sm">{text}</p>
        <p className="text-2xl mt-2 font-bold">{value}</p>
      </div>
    </div>
  );
}

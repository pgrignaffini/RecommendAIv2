/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
};

function Row({ title, children }: Props) {
  return (
    <div className="ml-[5px] text-white md:ml-[20px]">
      <h2 className="mb-2 text-2xl">{title}</h2>
      <div className="flex space-x-3 overflow-y-hidden overflow-x-scroll scrollbar-hide">
        {children}
      </div>
    </div>
  );
}

export default Row;

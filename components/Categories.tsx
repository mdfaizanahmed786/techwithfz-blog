import React from "react";

type Props = {
  category: string;
  active:string;
  handleActive: (category: string) => void;
};

const Categories = ({ category, active, handleActive }: Props) => {
  return (
    <>
    <div
      className={`category bg-[#1E1E1E] px-4 py-2 rounded-md text-white cursor-pointer text-sm drop-shadow-md ${
        active===category && "ring-[#10935F] ring-2"
      }`} onClick={()=>handleActive(category)}
    >
      {category}
    </div>
    </>
  );
};

export default Categories;

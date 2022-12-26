import React from "react";

type Props = {
  category: string;
  isActive: boolean;
};

const Categories = ({ category, isActive }: Props) => {
  return (
    <div
      className={`category bg-[#1E1E1E] px-4 py-2 rounded-md text-white cursor-pointer ${
        isActive && "ring-[#10935F] ring-2"
      }`}
    >
      {category}
    </div>
  );
};

export default Categories;

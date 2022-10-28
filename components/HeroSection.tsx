import React from "react";
import Image from "next/image";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="heroSection">
      <div className="max-w-[1350px] mx-auto flex gap-5 items-center p-10">
        <div className="flex flex-col gap-8 flex-1 ">
          <p className="text-5xl font-bold text-white">Welcome to our Blog!</p>
          <p className="font-bold text-4xl hover:underline decoration-green-400  cursor-pointer textStyle" title="coming soon">Subscribe to our Newsletter</p>
        </div>
        <div className="imageSection relative h-[396.96px] w-[607px] shadow-md">
          <Image src={"/hero.png"} className="shadow-xl"  layout="fill" alt="hero_section"/>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

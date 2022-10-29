import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="heroSection">
      <div className="max-w-[1350px] mx-auto flex gap-5 items-center p-10">
        <div className="flex flex-col gap-8 flex-1 ">
          <TypeAnimation
            sequence={[
              "",
              700,
              "Welcome",
              700,
              "Welcome To",
              700,
              "Welcome To Our",
              700,

              "Welcome To Our Blog!",
              700,
            ]}
            wrapper="p"
            repeat={Infinity}
            speed={30}
            className="text-5xl text-white font-semibold"
          />
          <p
            className="font-semibold text-4xl hover:underline decoration-green-400  cursor-pointer textStyle"
            title="coming soon"
          >
            Subscribe to our Newsletter
          </p>
          <Link href={"/blog"}>
            <p className="commonButton font-semibold cursor-pointer px-4  text-white w-32 py-2 ">
              Explore Blog
            </p>
          </Link>
        </div>
        <div className="imageSection relative h-[396.96px] w-[607px] shadow-md">
          <Image
            src={"/hero.png"}
            className="shadow-xl"
            layout="fill"
            alt="hero_section"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

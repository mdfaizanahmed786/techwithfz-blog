import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { toast } from "react-toastify";

type Props = {};

const HeroSection = (props: Props) => {
  const displayMessage=()=>{
    toast.success('Coming soon!', {
      position: "top-right",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  return (
    <div className="heroSection -mb-3 md:-mb-0">
      <div className="md:max-w-[1350px] md:mx-auto flex gap-5 items-center p-9 md:p-10">
        <div className="flex flex-col md:gap-8 gap-6 flex-1 ">
          <TypeAnimation
            sequence={[
              "",
              300,
              "Welcome",
              300,
              "Welcome To",
              300,
              "Welcome To Our",
              300,

              "Welcome To Our Blog!",
              300,
            ]}
            wrapper="p"
            repeat={Infinity}
            speed={30}
            className="md:text-5xl text-3xl text-center md:text-left text-white font-semibold"
          />
          <p
            className="font-semibold md:text-4xl text-2xl hover:underline decoration-green-400  cursor-pointer textStyle md:text-left text-center"
            title="coming soon"
            onClick={displayMessage}
          >
            Subscribe to our Newsletter
          </p>
          <div className="flex justify-center md:block py-2 md:py-0 ">

          <Link href={"/blog"}>
            <p className="commonButton font-semibold cursor-pointer px-4  text-white w-32 py-2 ">
              Explore Blog
            </p>
          </Link>
          </div>
        </div>
        <div className="imageSection relative h-[396.96px] hidden md:inline-flex w-[607px] shadow-md">
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

import React from "react";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-[#1E1E1E] md:p-6 p-4 ">
      <div className="flex md:flex-row flex-col md:justify-between max-w-[1430px] mx-auto items-center gap-5 md:gap-0">
        <div className="font-semibold text-white">
          Copyright &copy; 2022 techwithfz.com
        </div>
        <div className="icons-group flex gap-8 items-center">
          <AiOutlineTwitter className="text-[#10935F]" size={27} />
          <AiFillGithub className="text-[#10935F]" size={27} />
          <AiFillLinkedin className="text-[#10935F]"  size={27}/>
          <AiFillInstagram className="text-[#10935F]"  size={27}/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

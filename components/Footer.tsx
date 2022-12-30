import Link from "next/link";
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
          <Link href="https://twitter.com/FaizanA52900440"><AiOutlineTwitter className="text-[#10935F]" size={27} /></Link>
          <Link href="https://github.com/mdfaizanahmed786"><AiFillGithub className="text-[#10935F]" size={27} /></Link>
          <Link href="https://www.linkedin.com/in/faizan-ahmed-371a061bb/"><AiFillLinkedin className="text-[#10935F]"  size={27}/></Link>
          <Link href="https://www.instagram.com/ahmed_faizan_7860/"><AiFillInstagram className="text-[#10935F]"  size={27}/></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

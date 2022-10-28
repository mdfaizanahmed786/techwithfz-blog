import { AiOutlineClockCircle } from 'react-icons/ai'
import Link from "next/link";
import React from "react";

type Props = {
  id?: string;
  title: string;
  slug: string;
  desc: string;
  createdAt:string
};

const SinglePost = ({ title, slug, desc, createdAt }: Props) => {
  return (
    <article className="rounded-lg bg-[#1E1E1E] hover:shadow-2xl shadow-lg transition-all duration-300 cursor-pointer">
      <div className="flex flex-col gap-3">
        <div className="overflow-hidden rounded-lg cursor-pointer">
          <img src={"/im1.png"} className="hover:scale-105  translate-all duration-300 object-cover w-full" alt="hero_section" />
        </div>
        <div className="flex flex-col gap-5 px-7 py-5">
          <Link href={`blogpost/${slug}`}>
            <h3 className="font-bold text-center text-white text-xl cursor-pointer hover:text-gray-400 transition-all duration-300">
              {title}
            </h3>
          </Link>
          <p className="textStyle text-xs font-semibold">Date: {createdAt}</p>
          <div className="w-80">
            <div className="info text-white">{desc.slice(0, 150)+"..."}</div>
          </div>
          <div className="buttons flex justify-between items-center py-2">
          <Link href={`blogpost/${slug}`}>
            <button className="text-white font-semibold commonButton  px-5 py-2">
              Read More
            </button>
           
            </Link>
            <div className="flex gap-2 items-center">
            <AiOutlineClockCircle className='text-[#0BEF59]'/>
            <p className="textStyle text-xs font-semibold">21 min read</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SinglePost;
// width: 393px;
// height: 257px;

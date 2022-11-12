import { AiOutlineClockCircle } from 'react-icons/ai'
import Link from "next/link";
import React from "react";
import Image from 'next/image';
import parse from "html-react-parser";

type Props = {
  id?: string;
  title: string;
  slug: string;
  desc: string;
  createdAt:string
};

const SinglePost = ({ title, slug, desc, createdAt }: Props) => {
  return (
    <article className="rounded-lg bg-[#1E1E1E] hover:shadow-2xl shadow-lg transition-all duration-200 cursor-pointer">
      <div className="flex flex-col gap-3">
        <div className="overflow-hidden rounded-lg cursor-pointer">
          <Image src={"/im1.png"} className="hover:scale-105  translate-all duration-200 object-cover w-full" alt="hero_section" width={500} height={300} />
        </div>
        <div className="flex flex-col px-7 gap-5 py-5">
          <Link href={`blogpost/${slug}`}>
            <h3 className="font-bold text-center text-white text-xl cursor-pointer hover:text-gray-400 transition-all duration-200">
              {title}
            </h3>
          </Link>
          <p className="textStyle text-xs font-semibold ">Date: {createdAt}</p>
          <div className="">
            <p className="info text-white line-clamp-4">{parse(desc)}</p>
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


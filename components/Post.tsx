import Link from 'next/link'
import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import parse from "html-react-parser";

interface Props extends Response{
    deletePost: (id: string) => void
    admin: boolean
}

function Post({_id, createdAt, slug, desc,title, deletePost, admin}: Props) {
  return (
    <div
    key={_id}
    className="flex flex-col md:gap-5 gap-4 md:px-9 md:py-7 px-6 py-5 rounded-lg drop-shadow-lg  bg-[#1E1E1E] cursor-pointer transition-all duration-200 hover:drop-shadow-xl"
  >
    <p className="text-xs textStyle font-semibold">
      Date: {createdAt.slice(0, 10)}
    </p>
    <h2 className="font-bold text-white text-2xl cursor-pointer hover:text-gray-400 transition-all duration-200 ">
      <Link href={`blogpost/${slug}`}>{title}</Link>
    </h2>
    <div className="">
    <p className="info text-white line-clamp-2">{parse(desc)}</p>
  </div>
    <div className="flex justify-between">
      <div className="flex gap-5">
        <Link href={`blogpost/${slug}`}>
          <button className="commonButton py-2 w-32 font-semibold text-white">
            Read More
          </button>
        </Link>
        {admin && (
          <button className="commonButton py-2 hidden md:block w-32 font-semibold text-white" onClick={()=>deletePost(_id)}>
            Delete Post
          </button>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <AiOutlineClockCircle className="text-[#0BEF59]" />
        <p className="textStyle text-xs font-semibold">10 min read</p>
      </div>
    </div>
  </div>
  )
}

export default Post
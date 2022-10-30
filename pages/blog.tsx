import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { userContext } from "../context/userContext";
interface Response {
  _id: string;
  title: string;
  author: string;
  desc: string;
  slug: string;
  imgs: string[];
  createdAt: string;
  __v: number;
  authState: boolean;
}
type Props = Response[] | any;

const Blog = (props: Props) => {
  const { allBlogs } = props;
  const router = useRouter();
  const [admin, setAdmin] = useState<boolean>(false);
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth")!);
    if (auth?.isAdmin) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [router.query]);

  return (
    <div className="loginPage">
      <Head>
        <title>techWithFZ - Blog</title>
      </Head>
      <h1 className="text-3xl text-white font-bold text-center py-5 ">
        All Blogs ({allBlogs.length})
      </h1>
      <div className="flex flex-col gap-7 py-6 max-w-[1030px] mx-auto">
        {allBlogs.map((blog: Response) => (
          <div
            key={blog._id}
            className="flex flex-col gap-5 px-9 py-7 rounded-lg shadow-md hover:bg-[#2E2E2E] bg-[#1E1E1E] cursor-pointer transition-all duration-200 hover:shadow-lg"
          >
            <p className="text-xs textStyle font-semibold">
              Date: {blog.createdAt.slice(0, 10)}
            </p>
            <h2 className="font-bold text-white text-2xl cursor-pointer hover:text-gray-400 transition-all duration-200 ">
              <Link href={`blogpost/${blog.slug}`}>{blog.title}</Link>
            </h2>
            <p className="text-white">{blog.desc.slice(0, 200) + "..."}</p>
            <div className="flex justify-between">
              <div className="flex gap-5">
                <Link href={`blogpost/${blog.slug}`}>
                  <button className="commonButton py-2 w-32 font-semibold text-white">
                    Read More
                  </button>
                </Link>
                {admin && (
                  <button className="commonButton py-2 w-32 font-semibold text-white">
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
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const response = await fetch("http://localhost:3000/api/getposts");
  const { allBlogs } = await response.json();

  return {
    props: { allBlogs },
  };
}

export default Blog;

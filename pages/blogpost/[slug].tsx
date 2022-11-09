import Head from "next/head";
import { useRouter } from "next/router";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import parse from "html-react-parser";
import React, { useState } from "react";
import Image from "next/image";
interface Response {
  _id: string;
  title: string;
  author: string;
  desc: string;
  slug: string;
  imgs: string[];
  createdAt: string;
  __v: number;
}
interface Comment {
  _id: string;
  comment: string;
  email: string;
  slug: string;
  _v: number;
}

type Props = {};

const slug = (props: Response | any) => {
  const { specificPost, comments } = props;
  const router = useRouter();
  const { slug } = router.query;
  const getTitle = specificPost.filter((blog: Response) => blog.slug === slug);

  return (
    <div className="bg-[#2E2E2E]">
      <Head>
        <title>{getTitle[0].title}</title>
      </Head>
      <div
        className="flex items-center px-5 py-2 gap-1 cursor-pointer"
        onClick={() => router.back()}
      >
        <MdOutlineArrowBackIosNew className="text-green-500 font-bold" />
        <p className="text-white font-bold  textStyle">Go back</p>
      </div>

      <div className="md:max-w-[1030px] md:mx-auto md:p-14 px-6 py-7 ">
        {specificPost.map((blog: Response) => (
          <div key={blog._id} className="space-y-4">
            <p className="text-xs textStyle font-semibold">
              Date: {blog.createdAt.slice(0, 10)}
            </p>
            <h1 className="font-bold text-white text-4xl cursor-pointer ">
              {blog.title}
            </h1>
            <div className="flex gap-2 items-center">
              <FaUserCircle className="text-green-500" size={27} />
              <p className="text-white font-semibold">{blog.author}</p>
            </div>
            <div className="text-white text-lg leading-9">
              {parse(blog.desc)}
            </div>
            <Image
              src="/hackathon.png"
              alt="img_programming"
              className="rounded-md"
              width={900}
              height={400}
              objectFit="cover"
            />
            <p className="text-white text-lg leading-9">{parse(blog.desc)}</p>
          </div>
        ))}
        <div className="ratings text-center mt-5 ">
          <form>
            <div>
              <label htmlFor="comment">Add Comment</label>
              <textarea
                name="comment"
                id="comment"
                cols={30}
                rows={10}
                style={{ resize: "none" }}
              ></textarea>
              <button className="text-white font-semibold commonButton  px-5 py-2">Add Comment</button>
            </div>
          </form>
        </div>
        {comments.map(({ comment, email, _id }: Comment) => (
          <div key={_id}>
            <p>{comment}</p>
            <p>{email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch("https://techwithfz.vercel.app/api/getposts");
  const { allBlogs: posts } = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: Response) => ({
    params: { slug: post.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const response = await fetch("https://techwithfz.vercel.app/api/getposts");
  const { allBlogs } = await response.json();
  let specificPost = allBlogs.filter((blog: Response) => {
    return blog.slug === params.slug;
  });
  let comments=[]
if(specificPost[0]?.userComments){
  comments = specificPost[0]?.userComments;
}


  return {
    props: { specificPost, comments },
  };
}
export default slug;

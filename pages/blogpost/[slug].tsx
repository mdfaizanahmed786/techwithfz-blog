import Head from "next/head";
import { useRouter } from "next/router";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import React from "react";
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

type Props = {};

const slug = (props: Response | any) => {
  const { specificPost } = props;
  const router = useRouter();
  const { slug } = router.query;
  const getTitle = specificPost.filter((blog: Response) => blog.slug === slug);

  return (
    <div className="bg-[#2E2E2E]">
      <Head>
        <title>{getTitle[0].title}</title>
      </Head>
      <div className="flex items-center px-5 py-2 gap-1 cursor-pointer" onClick={()=>router.back()}>
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
            <p className="text-white text-lg leading-9">{blog.desc}</p>
            <img src="/hackathon.png" alt="img_programming" className="rounded-md" />
          
            <p className="text-white text-lg leading-9">{blog.desc}</p>
          </div>
        ))}
        <div className="ratings text-center mt-5 ">
           <p className="font-semibold textStyle text-xl">Found it useful? Please rate us to improve.</p>

        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { params } = context;
  const response = await fetch("https://techwithfz.vercel.app/api/getposts");
  const { allBlogs } = await response.json();
  let specificPost = allBlogs.filter((blog: Response) => {
    return blog.slug === params.slug;
  });

  return {
    props: { specificPost },
  };
}
export default slug;

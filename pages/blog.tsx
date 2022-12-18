import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import Post from "../components/Post";


type Props = Response[] | any;

const Blog = (props: Props) => {
  const { allBlogs } = props;
  const router = useRouter();
  const [admin, setAdmin] = useState<boolean>(false);
  const [newPosts, setNewPosts]=useState(allBlogs)
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth")!);
    if (auth?.isAdmin) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [router.query]);
  const deletePost=useCallback(()=>async(id: string)=>{
    let user = JSON.parse(localStorage.getItem("auth")!);
    if (user?.isAdmin) {
      let afterDelete = allBlogs.filter((post: Response) => post._id !== id);
      setNewPosts(afterDelete);
      await fetch(`https://techwithfz.vercel.app/api/deletepost/${id}`, {
        method: "DELETE",
      });
      toast.success('Deleted your Post!', {
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
  },[allBlogs])

  return (

    <div className="bg-[#2E2E2E] w-full">
      <Head>
        <title>TechWithFZ - Blog</title>
      </Head>
      <h1 className="text-3xl text-white font-bold text-center py-5 ">
        All Blogs({newPosts.length})
      </h1>
      <div className="flex flex-col gap-7 py-6 md:max-w-[1030px] md:mx-auto mx-4">
     
        {newPosts.map((blog: Response) => (
         <Post {...blog} deletePost={deletePost} admin={admin}/>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const response = await fetch("https://techwithfz.vercel.app/api/getposts");
  const { allBlogs } = await response.json();

  return {
    props: { allBlogs },
  };
}

export default Blog;

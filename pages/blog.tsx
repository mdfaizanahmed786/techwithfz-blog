import Head from "next/head";
import { useRouter } from "next/router";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Post from "../components/Post";
import jwt,{ JwtPayload, Secret } from "jsonwebtoken";
import { userContext } from "../context/userContext";


type Props = Response[] | any;

const Blog = (props: Props) => {
  const { allBlogs, authCookie } = props;
  const [newPosts, setNewPosts]=useState(allBlogs)
  const authContext = useContext(userContext);
  const {isAdmin}=authCookie

  useEffect(() => {
    if (authCookie) {
      authContext.setCookieAuth(authCookie);
    }
  }, []);
  const deletePost=useCallback(()=>async(id: string)=>{
 
    if (isAdmin) {
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
         <Post {...blog} deletePost={deletePost} admin={isAdmin}/>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const response = await fetch("https://techwithfz.vercel.app/api/getposts");
  const { allBlogs } = await response.json();
  let authCookie: string | JwtPayload = "";
  if (context?.req?.cookies["authToken"]) {
    let result = context?.req?.cookies["authToken"];
    if(result===process.env.NEXT_PUBLIC_ADMIN_TOKEN){
      authCookie = {
        email:'admin',
        isAdmin: true,
      };
    }
    else{

      authCookie = jwt.verify(result, process.env.JWT_SECRET as Secret);
    }
  }

  return {
    props: { allBlogs, authCookie },
  };
}

export default Blog;

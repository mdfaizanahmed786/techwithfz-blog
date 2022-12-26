import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { userContext } from "../context/userContext";
import { GoSearch } from "react-icons/go";
import Categories from "../components/Categories";
import { categories } from "../lib/categories";

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

interface Category{
  category:string,
  id:number,
  isActive:boolean
}


const Blog = (props: Props) => {
  const { allBlogs, authCookie } = props;
  const [newPosts, setNewPosts] = useState(allBlogs);
  const authContext = useContext(userContext);
  const { isAdmin } = authCookie;

  useEffect(() => {
    if (authCookie) {
      authContext.setCookieAuth(authCookie);
    }
  }, []);
  async function deletePost(id: string) {
    let user = JSON.parse(localStorage.getItem("auth")!);
    if (user?.isAdmin) {
      let afterDelete = allBlogs.filter((post: Response) => post._id !== id);
      setNewPosts(afterDelete);
      await fetch(`https://techwithfz.vercel.app/api/deletepost/${id}`, {
        method: "DELETE",
      });
      toast.success("Deleted your Post!", {
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
  }

  const filterItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPosts(
      allBlogs.filter((post: Response) =>
        post.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className=" bg-[#2E2E2E]">
      <div className="bg-[#2E2E2E] w-full h-full">
        <Head>
          <title>TechWithFZ - Blog</title>
        </Head>
        <h1 className="text-3xl text-white font-bold text-center pt-6 ">
          All Blogs({newPosts.length})
        </h1>

        <div className="md:max-w-[1030px] md:mx-auto mx-4">
          <div className="searchContainer py-2  space-y-3">
            <p className="font-bold textStyle">Search</p>
            <div className="bg-[#1E1E1E] flex  text-white ring-[#10935F] ring-2 rounded-md">
              <input
                type="text"
                className="searchInput flex-1 bg-transparent  focus:outline-none py-2 px-5"
                onChange={(e) => filterItems(e)}
                placeholder="Search for a post..."
              />
              <div className="bg-[#10B45B] px-5 py-4 rounded-br-md rounded-tr-md ">
                <GoSearch size={20} />
              </div>
            </div>
          </div>

          <div className="categories flex flex-wrap gap-4 py-4">
            {categories.map(({id, category, isActive}:Category) => (
              <Categories key={id} category={category} isActive={isActive}/>
            ))}

          </div>
        </div>

        <div className="flex flex-col gap-7 py-6 md:max-w-[1030px] md:mx-auto mx-4">
          {newPosts.map((blog: Response) => (
            <div
              key={blog._id}
              className="flex flex-col md:gap-5 gap-4 md:px-9 md:py-7 px-6 py-5 rounded-lg shadow-md  bg-[#1E1E1E] cursor-pointer transition-all duration-200 hover:shadow-xl"
            >
              <p className="text-xs textStyle font-semibold">
                Date: {blog.createdAt.slice(0, 10)}
              </p>
              <h2 className="font-bold text-white text-2xl cursor-pointer hover:text-gray-400 transition-all duration-200 ">
                <Link href={`blogpost/${blog.slug}`}>{blog.title}</Link>
              </h2>
              <div className="">
                <p className="info text-white line-clamp-2">
                  {parse(blog.desc)}
                </p>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-5">
                  <Link href={`blogpost/${blog.slug}`}>
                    <button className="commonButton py-2 w-32 font-semibold text-white">
                      Read More
                    </button>
                  </Link>
                  {isAdmin && (
                    <button
                      className="commonButton py-2 hidden md:block w-32 font-semibold text-white"
                      onClick={() => deletePost(blog._id)}
                    >
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
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const response = await fetch("https://techwithfz.vercel.app/api/getposts");
  const { allBlogs } = await response.json();
  let authCookie: string | JwtPayload = "";
  if (context?.req?.cookies["authToken"]) {
    let result = context?.req?.cookies["authToken"];
    if (result === process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
      authCookie = {
        email: "admin",
        isAdmin: true,
      };
    } else {
      authCookie = jwt.verify(result, process.env.JWT_SECRET as Secret);
    }
  }

  return {
    props: { allBlogs, authCookie },
  };
}

export default Blog;

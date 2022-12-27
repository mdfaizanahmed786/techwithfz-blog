import Head from "next/head";
import { useRouter } from "next/router";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Post from "../components/Post";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { userContext } from "../context/userContext";
import { GoSearch } from "react-icons/go";
import Categories from "../components/Categories";
import { categories } from "../lib/categories";

type Props = Response[] | any;

const Blog = (props: Props) => {
  const { allBlogs, authCookie } = props;
  const [newPosts, setNewPosts] = useState(allBlogs);
  const authContext = useContext(userContext);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { isAdmin } = authCookie;

  useEffect(() => {
    if (authCookie) {
      authContext.setCookieAuth(authCookie);
    }
  }, []);
  const deletePost = useCallback(
    () => async (id: string) => {
      if (isAdmin) {
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
    },
    [allBlogs]
  );

  const filterItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPosts(
      allBlogs.filter((post: Response) =>
        post.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleCategory = useCallback(
    (category: string) => {
      if (category === "All") {
        setNewPosts(allBlogs);
      } else {
        setNewPosts(
          allBlogs.filter((post: Response) => post.category === category)
        );
      }
    },
    [allBlogs]
  );

  return (
    <div className="bg-[#2E2E2E] w-full">
      <Head>
        <title>TechWithFZ - Blog</title>
      </Head>
      <h1 className="md:text-3xl text-xl text-white font-bold text-center pt-6 ">
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
            <div className="bg-[#10B45B] px-5 py-3 rounded-br-md rounded-tr-md ">
              <GoSearch size={20} />
            </div>
          </div>
        </div>

        <div className="categories flex flex-wrap md:gap-4 gap-3 py-4">
          {categories.map((category: Category) => (
            <Categories
              {...category}
              active={activeCategory}
              handleActive={setActiveCategory}
              handleCategory={handleCategory}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-7 py-7 md:py-6 md:max-w-[1030px] md:mx-auto mx-4">
        {newPosts.map((blog: Response) => (
          <Post {...blog} deletePost={deletePost} admin={isAdmin} />
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

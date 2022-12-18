import Head from "next/head";
import { useRouter } from "next/router";
import {
  MdOutlineArrowBackIosNew,
  MdArrowDropDown,
  MdArrowDropUp,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import parse from "html-react-parser";
import React, {
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import jwt, { Secret } from "jsonwebtoken";

import { toast } from "react-toastify";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Oval } from "react-loading-icons";
import Comment from "../../components/Comment";
import { userContext } from "../../context/userContext";
import { JwtPayload } from "jsonwebtoken";

interface Response {
  _id: string;
  title: string;
  author: string;
  desc: string;
  slug: string;
  imgs: string[];
  createdAt: string;
  authCookie: object;
  __v: number;
}

const slug = (props: Response | any) => {
  const { specificPost, comments, authCookie } = props;
  const router = useRouter();
  const { slug } = router.query;
  const getTitle = specificPost.filter((blog: Response) => blog.slug === slug);
  const [feedback, setFeedBack] = useState("");
  const [loader, setLoader] = useState(false);
  const { data: session } = useSession();
  const authContext = useContext(userContext);
  useEffect(() => {
    if (authCookie) {
      authContext.setCookieAuth(authCookie);
    }
  }, []);

  const matchResults = useMemo(
    () => (comment: string) => {
      let allComments = comments.filter(
        (item: Comment) => item.comment === comment
      );
      return allComments;
    },
    [comments]
  );

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoader(true);
    e.preventDefault();

    const comment = await fetch("http://localhost:3000/api/addcomment", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        comment: feedback,
        slug,
        email: !authCookie?.email ? session?.user?.email : authCookie?.email,
      }),
    });

    const response = await comment.json();
    setLoader(true);
    if (response.success) {
      router.reload();
      toast.success("Comment Added!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setLoader(false);
    if (response.err) {
      toast.error(`${response.err}`, {
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
  };

  return (
    <div className="bg-[#2E2E2E]">
      <Head>
        <title>{getTitle[0]?.title}</title>
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
        <div className="mt-5 py-6">
          {authCookie.email || session?.user?.email ? (
            <div className=" mt-5 md:w-96">
              <form
                className="flex flex-col bg-[#1e1e1e]  shadow-md p-4 rounded-md justify-center"
                onSubmit={addComment}
              >
                <div className="flex flex-col gap-5">
                  <label htmlFor="comment " className="textStyle font-bold">
                    Add Comment
                  </label>
                  <textarea
                    name="comment"
                    id="comment"
                    className="bg-[#2E2E2E] px-5 py-3 rounded-md outline-none text-white border-[#10935F] border-2"
                    placeholder="Enter your comment"
                    rows={2}
                    cols={10}
                    style={{ resize: "none" }}
                    required
                    value={feedback}
                    onChange={(e) => setFeedBack(e.target.value)}
                  ></textarea>
                  <button className="text-white font-semibold commonButton  px-3 py-2 w-36">
                    Add Comment
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <h2 className="text-white text-xl md:text-2xl font-semibold text-center">
              You must be logged in to comment!
            </h2>
          )}
        </div>

        <div className="flex flex-col gap-7">
          <div className="space-y-3">
            <h2 className="font-semibold md:text-3xl text-xl text-white">
              Comments ({comments.length})
            </h2>
            <div className="border border-gray-500" />
          </div>

          <div className="flex flex-col gap-4 md:w-96 overflow-x-auto">
            {loader && (
              <div className="flex justify-center">
                <Oval stroke="#10b45b" strokeWidth={3} />
              </div>
            )}
            {comments.map((comment: Comment) => (
              <Comment
                {...comment}
                matchResults={matchResults}
                cookieAuth={authCookie}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { params } = context;
  const response = await fetch("http://localhost:3000/api/getposts");
  const { allBlogs } = await response.json();
  let specificPost = allBlogs.filter((blog: Response) => {
    return blog.slug === params.slug;
  });
  let comments = [];
  if (specificPost[0]?.userComments) {
    comments = specificPost[0]?.userComments;
  }
  let authCookie: string | JwtPayload = "";
  if (context?.req?.cookies["authToken"]) {
    let result = context?.req?.cookies["authToken"];
    authCookie = jwt.verify(result, process.env.JWT_SECRET as Secret);
  }

  return {
    props: { specificPost, comments, authCookie },
  };
}
export default slug;

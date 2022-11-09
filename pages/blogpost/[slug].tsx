import Head from "next/head";
import { useRouter } from "next/router";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import parse from "html-react-parser";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import {Oval} from "react-loading-icons"

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
  createdAt: string;
  _v: number;
}

type Props = {};

const slug = (props: Response | any) => {
  const { specificPost, comments, authState } = props;
  const router = useRouter();
  const { slug } = router.query;
  const getTitle = specificPost.filter((blog: Response) => blog.slug === slug);
  const [user, setUser] = useState<string | null | undefined>("");
  const [feedback, setFeedBack]=useState("")
  const [loader, setLoader]=useState(false)
  const { data: session } = useSession();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth")!);
    if (auth?.success && auth?.authToken) {
      setUser(auth?.email);
    }
    if (!auth) {
      setUser(session?.user?.email);
    }
  }, [router.query]);

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = JSON.parse(localStorage.getItem("auth")!);
    if (auth) {
      const comment = await fetch(
        "https://techwithfz.vercel.app/api/addcomment",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            comment:feedback,

            email: auth?.email,
            slug,
          }),
        }
      );
      setLoader(true)
      const response = await comment.json();
      setLoader(true)
      if (response.success) {
        toast.success("Comment Added!", {
          position: "top-right",
          autoClose: 1800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          
        });
        router.reload()
       
      }
      setLoader(false)
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
    }
    
  };

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
        <div className="mt-5 py-6">
          {user || session?.user?.email ? (
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
                    onChange={(e)=>setFeedBack(e.target.value)}
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
            {loader && <Oval />}
            {comments.map(({ comment, email, _id, createdAt }: Comment) => (
              <div
                key={_id}
                className="bg-[#2E2E2E] px-5 py-5 rounded-md outline-none text-white border-[#10935F] border-2 flex flex-col gap-4 flex-1 "
              >
                <div className="flex items-center gap-3">
                  <FaUserCircle className="text-green-500" size={27} />
                  <p className="font-bold">{email.replace("@gmail.com", "")}</p>
                  <p className="text-xs text-gray-300">{createdAt.slice(0, 10)}</p>
                </div>
                <p>{comment}</p>
                <div>
                  <button className="text-white font-semibold commonButton  px-2 py-1 ">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
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
  let comments = [];
  if (specificPost[0]?.userComments) {
    comments = specificPost[0]?.userComments;
  }

  return {
    props: { specificPost, comments },
  };
}
export default slug;

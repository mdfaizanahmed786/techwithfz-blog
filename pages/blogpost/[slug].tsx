import Head from "next/head";
import { useRouter } from "next/router";
import { MdOutlineArrowBackIosNew, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import parse from "html-react-parser";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
 
import { toast } from "react-toastify";
import {
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { Oval } from "react-loading-icons";

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
type Reply = {
  email: string;
  reply: string;
};
interface Comment {
  _id: string;
  comment: string;
  email: string;
  slug: string;
  createdAt: string;
  replies: Reply[];
  likes:string[]
  _v: number;
}



const slug = (props: Response | any) => {
  const { specificPost, comments} = props;
  const router = useRouter();
  const { slug } = router.query;
  const getTitle = specificPost.filter((blog: Response) => blog.slug === slug);
  const [user, setUser] = useState<string | null | undefined>("");
  const [feedback, setFeedBack] = useState("");
  const [loader, setLoader] = useState(false);
  const { data: session } = useSession();
  const [showReply, setShowReply] = useState("");
  const replyToComment = useRef<HTMLTextAreaElement>(null);
  const [showReplies, setShowReplies] = useState("");
  const [show, setShow] = useState(false);
  const [like, setLike] = useState("");
  const [likeState, setLikeState]=useState(false)


  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth")!);
    if (auth?.success && auth?.authToken) {
      setUser(auth?.email);
    }
  }, [router.query]);
  const matchResults = (comment: string) => {
    let allComments = comments.filter(
      (item: Comment) => item.comment === comment
    );
    return allComments;
  };

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoader(true);
    e.preventDefault();

    const comment = await fetch("https://techwithfz.vercel.app/api/addcomment", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        comment: feedback,
        slug,
        email: !user ? session?.user?.email : user,
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

  const toggleReply = (comment: string) => {
    let allComments = matchResults(comment);
    if (allComments) {
      setShowReply(comment);
    }
  };
 
  const addNewReply = async (e:FormEvent, comment: string) => {
    e.preventDefault();
    const reply = await fetch("https://techwithfz.vercel.app/api/addreply", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        comment,
        slug,
        reply: replyToComment.current!.value,
        email: !user ? session?.user?.email : user,
      }),
    });
    const response = await reply.json();
    if (response.success) {
      router.reload();
      toast.success("Reply Added!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
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
  const toggleShowReplies = (comment: string) => {
    let allComments = matchResults(comment);
    if (allComments) {
      setShowReplies(comment);
      setShow(!show);
    }
    if (show) setShowReplies("");
  };


const handleLikes=async(id:string)=>{
  if(user && session?.user?.email){
  const like=await fetch("https://techwithfz.vercel.app/api/likecomment",{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({
      id,
      slug:slug,
      email:!user ? session?.user?.email : user,
    })
  })
  const response=await like.json()
  if(response.success){
    router.reload()
    toast.success("Liked!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setLike(id)
  }
  }
  else{
    toast.error("Login to like!", {
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
  

}
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
            {comments.map(
              ({ comment, email, _id, createdAt, replies, likes }: Comment) => (
                <div
                  key={_id}
                  className="bg-[#2E2E2E] px-5 py-5 rounded-md outline-none text-white border-[#10935F] border-2 flex flex-col gap-4 flex-1 "
                >
                  <div className="flex items-center gap-3">
                    <FaUserCircle className="text-green-500" size={27} />
                    <p className="font-bold">
                      {email.replace("@gmail.com", "")}
                    </p>
                    <p className="text-xs text-gray-300">
                      {createdAt.slice(0, 10)}
                    </p>
                  </div>
                  <p>{comment}</p>
                  {replies.length !== 0 && (
                    <div
                      onClick={() => toggleShowReplies(comment)}
                      className="text-white font-semibold cursor-pointer flex gap-1 items-center"
                    >
                      {show && showReplies === comment ? <div> <p className="flex items-center "> <MdArrowDropUp className="text-white" size={27} /> <span className="font-bold text-white">Hide</span></p></div> : <div> <p className="flex items-center "> <MdArrowDropDown className="text-white" size={27} /> <span className="font-bold text-white">View</span></p></div>} <div> all
                      replies ({replies.length})</div>
                    </div>
                  )}
                  {replies.length !== 0 &&
                    showReplies === comment &&
                    replies.map(({ reply, email }: Reply, i) => (
                      <div
                        key={i}
                        className="bg-[#1e1e1e] px-5 py-5 rounded-md outline-none text-white border-[#10935F] border-2 flex flex-col gap-4 flex-1 "
                      >
                        <div className="flex items-center gap-3">
                          <FaUserCircle className="text-green-500" size={27} />
                          <p className="font-bold">
                            {email.replace("@gmail.com", "_gm")}
                          </p>
                        </div>
                        <p>{reply}</p>
                      </div>
                    ))}

                  <div>
                  <div className="flex gap-4 items-center">
                      <div className="space-x-1 flex items-center">
                        <div className="cursor-pointer">
                          {/* @ts-ignore */}
                          {likes.includes(session?.user?.email || user) && (session?.user?.email || user)   ? (
                          
                        
                            <AiFillHeart
                              size={20}
                              className="cursor-pointer textStyle"
                              title="Like"
                            
                            />
                          ) : (
                            <AiOutlineHeart
                              size={20}
                              className="cursor-pointer"
                              title="Like"
                              onClick={()=>handleLikes(_id)}
                            />
                          )}
                        </div>
                        <p className="font-semibold text-base">{likes.length}</p>
                      </div>
                     

                      {(session?.user || user) && (
                        <button
                          className="text-white font-semibold commonButton  px-2 py-1 "
                          onClick={() => toggleReply(comment)}
                        >
                          Reply
                        </button>
                      )}
                    </div>
                    {showReply === comment && (
                      <form onSubmit={(e)=>addNewReply(e, comment)}>
                        <div className="flex flex-col gap-5 mt-5 ">
                          <textarea
                            name="comment"
                            ref={replyToComment}
                            id="comment"
                            className="bg-[#1e1e1e] px-5 py-3 rounded-md outline-none text-white border-[#10935F] border-2"
                            placeholder="Add a reply"
                            rows={2}
                            cols={10}
                            style={{ resize: "none" }}
                            required
                          ></textarea>
                          <div className="flex gap-4">
                            <button
                              className="text-white font-semibold commonButton  px-3 py-2 w-36"
                            
                            >
                              Add Reply
                            </button>

                            <button
                              className="text-white font-semibold commonButton  px-3 py-2 w-36"
                              onClick={() => setShowReply("")}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )
            )}
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

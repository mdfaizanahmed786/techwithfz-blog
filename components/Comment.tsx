import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { toast } from "react-toastify";
import Replies from "./Replies";
import TimeAgo from "react-timeago"


function Comment({
  comment,
  email,
  _id,
  createdAt,
  replies,
  likes,
  matchResults,
  cookieAuth
}: Comment) {

  const { data: session } = useSession();
  const [showReply, setShowReply] = useState("");
  const replyToComment = useRef<HTMLTextAreaElement>(null);
  const [showReplies, setShowReplies] = useState("");
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(likes.length);
  const [liked, setLiked]=useState(false)
  const { slug } = useRouter().query;
  const router = useRouter();

  

  const addNewReply = async (e: FormEvent, comment: string) => {
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
        email:!cookieAuth.email ? session?.user?.email : cookieAuth?.email,
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

  const toggleReply = (comment: string) => {
    let allComments = matchResults(comment);
    if (allComments) {
      setShowReply(comment);
    }
  };

  const handleLikes = async (id: string) => {
    if (cookieAuth?.email || session?.user?.email) {
      const like = await fetch(
        "https://techwithfz.vercel.app/api/likecomment",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id,
            slug: slug,
            email: !cookieAuth.email ? session?.user?.email : cookieAuth?.email,
          }),
        }
      );
      const response = await like.json();
      if (response.success) {
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
        setLike(prevCount=>prevCount+1);
        setLiked(prevLike=>!prevLike)
      }
    } else {
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
      router.push("/login")
    }
  };

  useEffect(()=>{
    if(likes.includes(session?.user?.email || cookieAuth?.email) &&
    (session?.user?.email || cookieAuth?.email)){
      setLiked(true)
     
    }
  },[like])
  return (
    <div
      key={_id}
      className="bg-[#2E2E2E] px-5 py-5 rounded-md outline-none text-white border-[#10935F] border-2 flex flex-col gap-4 flex-1 "
    >
      <div className="flex items-center gap-3">
        <FaUserCircle className="text-green-500" size={27} />
        <p className="font-bold">{email.replace("@gmail.com", "")}</p>
        <TimeAgo date={createdAt} className="text-xs text-gray-300" />
      </div>
      <p>{comment}</p>
      {replies.length !== 0 && (
        <div
          onClick={() => toggleShowReplies(comment)}
          className="text-white font-semibold cursor-pointer flex gap-1 items-center"
        >
          {show && showReplies === comment ? (
            <div>
              {" "}
              <p className="flex items-center ">
                {" "}
                <MdArrowDropUp className="text-white" size={27} />{" "}
                <span className="font-bold text-white">Hide</span>
              </p>
            </div>
          ) : (
            <div>
              {" "}
              <p className="flex items-center ">
                {" "}
                <MdArrowDropDown className="text-white" size={27} />{" "}
                <span className="font-bold text-white">View</span>
              </p>
            </div>
          )}{" "}
          <div> all replies ({replies.length})</div>
        </div>
      )}
      {replies.length !== 0 &&
        showReplies === comment &&
        replies.map((reply: Reply, i) => <Replies {...reply} key={i} />)}

      <div>
        <div className="flex gap-4 items-center">
          <div className="space-x-1 flex items-center">
            <div className="cursor-pointer">
              {/* @ts-ignore */}
              {liked ? (
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
                  onClick={() => handleLikes(_id)}
                />
              )}
            </div>
            <p className="font-semibold text-base">{likes.length}</p>
          </div>

          {(session?.user ||cookieAuth?.email) && (
            <button
              className="text-white font-semibold commonButton  px-2 py-1 "
              onClick={() => toggleReply(comment)}
            >
              Reply
            </button>
          )}
        </div>
        {showReply === comment && (
          <form onSubmit={(e) => addNewReply(e, comment)}>
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
                <button className="text-white font-semibold commonButton  px-3 py-2 w-36">
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
  );
}

export default Comment;

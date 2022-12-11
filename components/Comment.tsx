import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { toast } from "react-toastify";
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
  likes: string[];
  matchResults: (comment: string) => Comment;
  _v: number;
}

const Comment = ({
  _id,
  comment,
  email,
  slug,
  createdAt,
  replies,
  likes,
  matchResults,
}: Comment) => {
  const [user, setUser] = useState<string | null | undefined>("");
  const { data: session } = useSession();
  const [showReply, setShowReply] = useState("");
  const replyToComment = useRef<HTMLTextAreaElement>(null);
  const [showReplies, setShowReplies] = useState("");
  const [show, setShow] = useState(false);
  const [like, setLike] = useState("");
  const router = useRouter();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth")!);
    if (auth?.success && auth?.authToken) {
      setUser(auth?.email);
    }
  }, [router.query]);
  const toggleShowReplies = (comment: string) => {
    let allComments = matchResults(comment);
    if (allComments) {
      setShowReplies(comment);
      setShow(!show);
    }
    if (show) setShowReplies("");
  };

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

  const handleLikes = async (id: string) => {
    const like = await fetch("http://localhost:3000/api/likecomment", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id,
        slug: slug,
        email: !user ? session?.user?.email : user,
      }),
    });
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
      setLike(id);
    }
    
  };
  const toggleReply = (comment: string) => {
    let allComments = matchResults(comment);
    if (allComments) {
      setShowReply(comment);
    }
  };

  return (
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
        replies.map(({ reply, email }: Reply, i) => (
          <div
            key={i}
            className="bg-[#1e1e1e] px-5 py-5 rounded-md outline-none text-white border-[#10935F] border-2 flex flex-col gap-4 flex-1 "
          >
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-green-500" size={27} />
              <p className="font-bold">{email.replace("@gmail.com", "")}</p>
            </div>
            <p>{reply}</p>
          </div>
        ))}

      <div>
        <div className="flex gap-4 items-center">
          <div className="space-x-1 flex items-center">
            <div className="cursor-pointer">
              {like === _id && (session?.user?.email || user) ? (
                <AiFillHeart
                  size={20}
                  className="cursor-pointer textStyle"
                  title="Like"
                  onClick={() => {
                    setLike("");
                  }}
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
};

export default Comment;
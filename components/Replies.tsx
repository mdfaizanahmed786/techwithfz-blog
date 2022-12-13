import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { formatted_date } from "../lib/dateFormatter";
import TimeAgo from "react-timeago"


function Replies({ reply, email, createdAt }: Reply) {
  return (
    <div className="bg-[#1e1e1e] px-5 py-5 rounded-md outline-none text-white border-[#10935F] border-2 flex flex-col gap-4 flex-1 ">
      <div className="flex items-center gap-3 flex-wrap">
        <FaUserCircle className="text-green-500" size={27} />
        <p className="font-bold">{email.replace("@gmail.com", "_gm")}</p>
        <TimeAgo date={createdAt} className="text-xs text-gray-300" />
      </div>
      <p>{reply}</p>
    </div>
  );
}

export default Replies;

"use client";

import axios from "axios";
import { useState } from "react";
import { Comment } from "@/models/Blog";

interface CommentBoxProps {
  id: string;
  commentArray: Comment[];
}

const CommentBox = ({ id, commentArray }: CommentBoxProps) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(
    commentArray ? commentArray : []
  );

  const handleOnClick = async () => {
    const resopnse = await axios.post(`/api/comments/${id}`, { comment });

    setComments(resopnse.data.comments);
    setComment("");
  };
  return (
    <div className="space-y-3">
      <div className="space-y-2 shadow-md border-gray-300 border-1">
        <textarea
          name="comment"
          id="comment"
          className="w-full h-40 p-2"
          placeholder="Write your opinion..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          className="w-full p-3 text-center bg-blue-500 text-white text-lg disabled:cursor-not-allowed cursor-pointer disabled:bg-blue-200"
          onClick={handleOnClick}
          disabled={comment.trim().length === 0}
        >
          Post
        </button>
      </div>
      <div className="space-y-3">
        <div className="text-lg font-bold">Comments:</div>
        {comments.map((cmt, i) => (
          <div key={i} className=" rounded-md shadow-md p-3 space-y-3">
            <div className="flex justify-between">
              <div className="flex-1 line-clamp-1">{cmt.user?.username}</div>
              <div className="flex-1 text-right line-clamp-1">
                {cmt.user?.email}
              </div>
            </div>
            <div>{cmt.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;

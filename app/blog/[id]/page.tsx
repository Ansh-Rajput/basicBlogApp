"use client";
import CommentBox from "@/components/CommentBox";
import Loading from "@/components/Loading";
import { IBlog } from "@/models/Blog";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BlogPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [blog, setBlog] = useState<IBlog>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.get(`/api/blogs/${id}`);
      setBlog(response.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="space-y-5 max-w-xl m-auto p-3">
      <h1 className="text-4xl font-bold capitalize text-center">
        {blog?.title}
      </h1>
      {blog?.imageUrl ? (
        <img
          src={blog.imageUrl}
          className="h-[50vh] object-cover m-auto shadow-md"
        />
      ) : null}
      {blog?.videoUrl ? (
        <video
          src={blog.videoUrl}
          className="h-[50vh] object-cover m-auto shadow-md"
        />
      ) : null}
      <div>{blog?.content}</div>
      <CommentBox id={id} commentArray={blog?.comments!} />
    </div>
  );
};

export default BlogPage;

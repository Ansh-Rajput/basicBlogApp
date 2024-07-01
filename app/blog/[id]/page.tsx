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
    <div className="space-y-8 max-w-4xl mx-auto my-7 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold capitalize text-center text-gray-900">
        {blog?.title}
      </h1>
      {blog?.imageUrl ? (
        <img
          src={blog.imageUrl}
          className="h-96 w-full object-cover rounded-lg shadow-md"
          alt="Blog"
        />
      ) : null}
      {blog?.videoUrl ? (
        <video
          src={blog.videoUrl}
          className="h-96 w-full object-cover rounded-lg shadow-md"
          controls
        />
      ) : null}
      <div className="text-lg text-gray-800 leading-relaxed">
        {blog?.content}
      </div>
      <CommentBox id={id} commentArray={blog?.comments!} />
    </div>
  );
};

export default BlogPage;

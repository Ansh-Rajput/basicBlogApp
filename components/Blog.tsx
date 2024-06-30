import { IBlog } from "@/models/Blog";
import Link from "next/link";
import React from "react";

const Blog = ({ blog }: { blog: IBlog }) => {
  return (
    <Link
      href={`blog/${blog._id}`}
      className="bg-white p-5 rounded shadow-md space-y-2"
    >
      <img src={blog.imageUrl} alt="img" className="object-contain" />
      <h3 className="text-xl font-bold line-clamp-1">{blog.title}</h3>
      <p className="line-clamp-3">{blog.content}</p>
    </Link>
  );
};

export default Blog;

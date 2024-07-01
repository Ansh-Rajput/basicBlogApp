"use client";
import { IBlog } from "@/models/Blog";
import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "./Blog";
import Loading from "./Loading";
import Link from "next/link";

const Blogs = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (blogs.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl font-bold">No blogs yet...</h2>
        <Link href={"/createBlog"} className="text-blue-500 text-center block">
          Create a blog?
        </Link>
      </div>
    );
  }

  return (
    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {blogs.map((blog, i) => (
        <Blog blog={blog} key={i} />
      ))}
    </div>
  );
};

export default Blogs;

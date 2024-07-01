"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Span } from "next/dist/trace";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [creating, setCreating] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setCreating(true);
      const response = await axios.post("/api/blogs", {
        title,
        content,
        imageUrl,
        videoUrl,
      });

      setCreating(false);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg p-8 bg-white shadow-md rounded-lg space-y-4"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full p-2 border border-gray-300 rounded h-40"
        ></textarea>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Video URL"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={creating || !title || !content}
          className="w-full p-2 bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          {creating ? <span>Creating blog...</span> : <span>Create blog</span>}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;

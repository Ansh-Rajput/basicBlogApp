// import { IBlog } from "@/models/Blog";
// import Link from "next/link";
// import React from "react";

// const Blog = ({ blog }: { blog: IBlog }) => {
//   return (
//     <Link
//       href={`blog/${blog._id}`}
//       className="bg-white p-5 rounded shadow-md space-y-2"
//     >
//       <img src={blog.imageUrl} alt="img" className="object-contain" />
//       <h3 className="text-xl font-bold line-clamp-1">{blog.title}</h3>
//       <p className="line-clamp-3">{blog.content}</p>
//     </Link>
//   );
// };

// export default Blog;

import { IBlog } from "@/models/Blog";
import Link from "next/link";
import React from "react";

const Blog = ({ blog }: { blog: IBlog }) => {
  const defaultImageUrl = "https://demofree.sirv.com/nope-not-here.jpg?w=150";

  return (
    <Link
      href={`blog/${blog._id}`}
      className="bg-white p-5 rounded shadow-md space-y-2 flex flex-col h-full"
    >
      <div className="h-48 w-full bg-gray-200 rounded overflow-hidden">
        <img
          src={blog.imageUrl || defaultImageUrl}
          alt="img"
          className="object-cover h-full w-full"
        />
      </div>
      <h3 className="text-xl font-bold line-clamp-1">{blog.title}</h3>
      <p className="line-clamp-3 flex-grow">{blog.content}</p>
    </Link>
  );
};

export default Blog;

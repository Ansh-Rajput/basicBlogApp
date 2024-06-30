"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { IoCreate } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import axios from "axios";

const NavBar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
    router.push("/signin");
  };

  return (
    <div className="p-5 py-3 text-lg flex justify-between items-center shadow-md">
      <Link href={"/"} className="text-2xl font-bold">
        BlogApp
      </Link>
      <div className="flex gap-5">
        <Link
          href={"/createBlog"}
          className="bg-blue-500 text-white flex justify-center items-center p-3 rounded-md "
        >
          <IoCreate size={30} />
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white flex justify-center items-center p-3 rounded-md"
        >
          <HiOutlineLogout size={30} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;

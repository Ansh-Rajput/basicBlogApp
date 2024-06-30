import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  await connectDB();
  try {
    const blogs = await Blog.find().populate("author");
    return Response.json(blogs);
  } catch (error) {
    return new Response(error as string, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();

  // const headersList = headers();

  // const authorization = headersList.get("authorization");

  // if (!authorization) {
  //   return new Response("User not verified", { status: 401 });
  // }

  // const token = authorization.split(" ")[1];

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("User not verified", { status: 401 });
  }

  try {
    const { title, content, imageUrl, videoUrl } = await req.json();
    const decoded = jwt.verify(
      String(token),
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    const authorId = decoded.userId;

    const blog = new Blog({
      title,
      content,
      author: authorId,
      imageUrl,
      videoUrl,
    });
    await blog.save();
    return Response.json(blog);
  } catch (error) {
    return new Response(String(error), { status: 500 });
  }
}

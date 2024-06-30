import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const id = params.id;
  const { comment } = await req.json();

  if (!comment) {
    return new Response("Invalid field!");
  }

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("User not verified", { status: 401 });
  }

  const decoded = jwt.verify(
    String(token),
    process.env.JWT_SECRET as string
  ) as jwt.JwtPayload;

  const userId = decoded.userId;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return new Response("Invalid action!");
    }

    blog.comments.push({ user: userId, comment });
    await blog.save();

    const populatedBlog = await blog.populate(
      "comments.user",
      "username email"
    );

    return Response.json(populatedBlog);
  } catch (error) {
    return new Response(String(error), { status: 500 });
  }
}

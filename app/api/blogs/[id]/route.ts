import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import User from "@/models/User";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const blog = await Blog.findById(params.id).populate(
      "author comments.user"
    );
    if (!blog) {
      return Response.json({ data: "BlogNotFound" });
    }
    return Response.json(blog);
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}

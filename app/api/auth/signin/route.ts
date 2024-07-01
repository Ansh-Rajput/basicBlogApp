import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response("All fields are required", { status: 400 });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return new Response("Invalid credentials", { status: 400 });
    }
    if (!user.is_verified) {
      return new Response("User not verified", { status: 400 });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string
    );

    const serialized = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });
    return new Response("Login successful", {
      status: 200,
      headers: { "Set-Cookie": serialized },
    });
    // return Response.json({ token });
  } catch (error) {
    return Response.json({ error: "Error logging in user" });
  }
}
// {"email":"ansh@gmail.com","password":"ansh123"}

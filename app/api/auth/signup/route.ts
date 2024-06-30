import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return new Response("All fields are required", { status: 400 });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new Response("User already exists", { status: 400 });
  }

  try {
    const user = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    await user.save();
    return new Response("User Created", { status: 200 });
  } catch (error) {
    return new Response("Error creating user", { status: 400 });
  }
}

// {"username":"ansh","email":"ansh@gmail.com","password":"ansh123"}

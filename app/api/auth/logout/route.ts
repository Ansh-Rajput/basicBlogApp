import { serialize } from "cookie";

export async function GET() {
  const serialized = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1, // Remove the cookie
    path: "/",
  });

  return new Response("LogOut successful", {
    status: 200,
    headers: {
      "Set-Cookie": serialized,
      "Cache-Control":
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      Expires: "0",
      Pragma: "no-cache",
    },
  });
}

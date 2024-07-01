import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import EmailVerificationModel from "@/models/emailVerificationSchema";
import sendEmailVerificationOTP from "@/utils/sendEmailVerification";

export async function POST(req: Request) {
  try {
    await connectDB();

    console.log("object");
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response("All fields are required", { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return new Response("User not exists", { status: 400 });
    }

    if (existingUser.is_verified) {
      return new Response("Email already verified", { status: 400 });
    }

    const emailVerification = await EmailVerificationModel.findOne({
      userId: existingUser._id,
      otp,
    });

    if (!emailVerification) {
      if (!existingUser.is_verified) {
        await sendEmailVerificationOTP(existingUser);
        return new Response("Invalid otp!", { status: 400 });
      }
      return new Response("Invalid otp!", { status: 400 });
    }

    const currentTime = new Date();

    const expirationTime = new Date(
      emailVerification.createdAt.getTime() + 15 * 60 * 1000
    );

    if (currentTime > expirationTime) {
      await sendEmailVerificationOTP(existingUser);

      return new Response("OTP expired!", { status: 400 });
    }

    existingUser.is_verified = true;
    await existingUser.save();

    await EmailVerificationModel.deleteMany({ userId: existingUser._id });

    return new Response("Email Verified");
  } catch (error) {
    console.log(error);
  }
}

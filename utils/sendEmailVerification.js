import transporter from "../config/emailConfig";
import connectDB from "@/lib/mongodb";
import EmailVerificationModel from "../models/emailVerificationSchema";

const sendEmailVerificationOTP = async (user) => {
  const otp = Math.floor(1000 + Math.random() * 9000);

  const otpVerificationLink = `${process.env.APP_URL}/verify_otp?otp=${otp}&email=${user.email}`;


  await connectDB();

  await new EmailVerificationModel({ userId: user._id, otp }).save();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333;">Verify Your Account</h2>
      <p style="font-size: 16px; color: #555;">
        Hi ${user.user_name},
      </p>
      <p style="font-size: 16px; color: #555;">
        Thank you for registering with our service. To complete your registration, please verify your email address by using the OTP code below:
      </p>
      <p style="font-size: 24px; font-weight: bold; color: #333;">
        ${otp}
      </p>
      <p style="font-size: 16px; color: #555;">
        Alternatively, you can click the link below to verify your email:
      </p>
      <a href="${otpVerificationLink}" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
      <p style="font-size: 16px; color: #555; margin-top: 20px;">
        If you did not sign up for this account, you can ignore this email.
      </p>
      <p style="font-size: 16px; color: #555;">
        Regards,<br/>
        Ansh
      </p>w
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "OTP - Veriy your account",
    html: htmlContent,
  })

  return otp;
}

export default sendEmailVerificationOTP;
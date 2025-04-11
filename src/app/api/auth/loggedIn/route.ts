import { NextResponse } from 'next/server';
import { connectDB } from '@/config/dbConfig';
import Redis from 'ioredis';
import { z } from 'zod';
import { User } from '@/models/userModel';
import { cookies } from 'next/headers';

// Redis client setup
const redis = new Redis(process.env.REDIS_URL!);

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must be numeric'),
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, otp } = await req.json();
    const cookieStore = await cookies();

    console.log("📩 Incoming Email:", email);
    console.log("🔢 Incoming OTP:", otp);

    otpSchema.parse({ otp });

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
    }

    const storedOtp = await redis.get(`otp:${email}`);
    console.log("📦 Stored OTP from Redis:", storedOtp);

    if (!storedOtp) {
      return NextResponse.json({ message: 'OTP has expired or is invalid.' }, { status: 400 });
    }

    if (storedOtp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP.' }, { status: 400 });
    }

    //MEANS OTP IS VALID 
    const existingUser = await User.findOne({ email });

    //  Set temp_email cookie only if it's a new user
    if (!existingUser) {
      cookieStore.set("temp_email", email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 5 * 60, // 5 minutes
        path: "/",
      });
    }

    // Optional: Delete the OTP after successful verification
    await redis.del(`otp:${email}`);

    return NextResponse.json({
      message: '✅ OTP verified successfully!',
      newUser: !existingUser,
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Error during OTP verification:', error);
    return NextResponse.json({ message: 'Failed to verify OTP' }, { status: 500 });
  }
}

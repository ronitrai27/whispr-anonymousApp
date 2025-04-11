import { NextResponse } from 'next/server';
import { connectDB } from '@/config/dbConfig';
import Redis from 'ioredis';
import { z } from 'zod';

// Redis client setup
const redis = new Redis(process.env.REDIS_URL!);

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must be numeric'),
});

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, otp } = await req.json();
    console.log("📩 Incoming Email:", email);
    console.log("🔢 Incoming OTP:", otp);

    otpSchema.parse({ otp });

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
    }

    // Get OTP from Redis (DO NOT overwrite here)
    const storedOtp = await redis.get(`otp:${email}`);
    console.log("📦 Stored OTP from Redis:", storedOtp);

    if (!storedOtp) {
      return NextResponse.json({ message: 'OTP has expired or is invalid.' }, { status: 400 });
    }

    if (storedOtp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP.' }, { status: 400 });
    }

    // ✅ OTP matched
    return NextResponse.json({ message: '✅ OTP verified successfully!' }, { status: 200 });

  } catch (error) {
    console.error('❌ Error during OTP verification:', error);
    return NextResponse.json({ message: 'Failed to verify OTP' }, { status: 500 });
  }
}

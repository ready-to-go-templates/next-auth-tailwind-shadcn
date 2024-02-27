import User from "@models/user";
import dbConnect from "@api/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { email, password, firstName, lastName } = await req.json();

  console.log("email: ", email);

  try {
    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return new NextResponse("Email is already in user", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      passwordConfirm: hashedPassword,
      userName: email,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      return new NextResponse("success", { status: 200 });
    }
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};

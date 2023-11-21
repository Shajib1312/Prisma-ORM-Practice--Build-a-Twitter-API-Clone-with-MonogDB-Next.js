import connectToDB from "@/utils";
import prisma from "../../../../prisma";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();
    if (!email && !password) {
      return NextResponse.json(
        {
          massage: "Please provide email and password",
        },
        { status: 400 }
      );
    }
    await connectToDB();

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 402 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Password does not Correct" },
        { status: 403 }
      );
    }

    return NextResponse.json({ massage: "Logged in" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
};


// ---------------------------------------------------------



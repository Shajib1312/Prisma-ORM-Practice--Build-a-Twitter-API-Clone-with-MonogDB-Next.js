import connectToDB from "@/utils";
import prisma from "../../../../prisma";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    // collect data from input throw by user interface
    const { name, email, password } = await req.json();

    // Check Validity where user,email,password provided or not
    if (!name && !email && !password) {
      return NextResponse.json({
        massage: "Please provide name, email and password",
      });
    }
    // connect to prisma client database
    await connectToDB();
    // Check Validity where email already register or not
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          massage: "User Already Register, Please Log in",
        },
        { status: 403 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashPassword },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
};



// -----------------------------                                                       
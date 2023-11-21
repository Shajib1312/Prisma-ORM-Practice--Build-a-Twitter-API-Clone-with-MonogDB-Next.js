import connectToDB from "@/utils";
import prisma from "../../../../prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const tweets = await prisma.tweets.findMany();
    return NextResponse.json({ tweets }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

// ----------------------------------------------------------------

export const POST = async (req: Request) => {
  try {
    // collect data from input throw by user interface
    const { tweet, userId } = await req.json();

    // Check Validity where user,email,password provided or not
    if (!tweet && !userId) {
      return NextResponse.json({
        massage: "Invalid data provided",
      });
    }
    // connect to prisma client database
    await connectToDB();
    // Check Validity where email already register or not
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({
        massage: "User does not exist",
      });
    }

    const newTweet = await prisma.tweets.create({
      data: { tweet, userId },
    });
    return NextResponse.json({ tweet: newTweet }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

// -----------------------------

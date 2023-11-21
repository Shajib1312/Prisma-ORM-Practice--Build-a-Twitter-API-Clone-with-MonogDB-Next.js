import connectToDB from "@/utils";
import prisma from "../../../../prisma";
import { NextResponse } from "next/server";

export type UserType = {
  id: String;
  name: String;
  email: String;
  password: String;
}[];

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const users: UserType = await prisma.user.findMany({
      include: {
        tweets: true,
        _count: true,
      },
    });
    return NextResponse.json({ users }, { status: 200 });
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

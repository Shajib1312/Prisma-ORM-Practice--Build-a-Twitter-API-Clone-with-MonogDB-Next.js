import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import connectToDB from "@/utils";

// Get Single Tweet

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    await connectToDB();
    const tweet = await prisma.tweets.findUnique({
      where: { id },
    });
    return NextResponse.json({ tweet }, { status: 200 });
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
// -----------------------------

// Update Single Tweet

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    await connectToDB();

    const tweet = await prisma.tweets.update({
      where: { id },
      data: await req.json(),
    });

    return NextResponse.json({ tweet }, { status: 200 });
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
// -----------------------------------------

// Delete Single Tweet

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    await connectToDB();
    const tweet = await prisma.tweets.delete({
      where: { id },
      select: {
        id: true,
      },
    });
    return NextResponse.json({ tweet }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};

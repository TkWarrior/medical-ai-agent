
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(NextRequest) {
  try {
    const body = await req.json();

    const { callId, transcript, metadata } = body;
    console.log("body" ,body )
   
    await prisma.callLog.update({
      where: { callId },
      data: {
        transcript,
        postCallData: metadata,
        status: "completed",
        endedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Post-call data saved" });
  } catch (err) {
    console.error("Post-call webhook error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

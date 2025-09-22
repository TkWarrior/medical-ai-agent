
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const { callId, transcript, metadata } = body;
    console.log("body" ,body )
   
    await prisma.callLog.update({
      where: { callId: sessionId },
      data: {
        transcript : transcript ? JSON.stringify(transcript):null,
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

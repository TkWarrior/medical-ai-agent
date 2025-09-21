import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {
  try {
    const calls = await prisma.callLog.findMany({
      orderBy: { incomingAt: "desc" },
      include: { bot: true }, 
    });
    return NextResponse.json(calls);
  } catch (err) {
    console.error("Error fetching calls:", err);
    return NextResponse.json({ error: "Failed to fetch calls" }, { status: 500 });
  }
}

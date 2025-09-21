
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bots = await prisma.bot.findMany({
      orderBy: { createdAt: "desc" },
    });
    console.log("Bots body :", bots)
    return NextResponse.json(bots);
  } catch (err) {
    console.error("Error fetching bots:", err);
    return NextResponse.json({ error: "Failed to fetch bots" }, { status: 500 });
  }
}

export async function POST(NextRequest) {
  try {
    const body = await req.json();

    const bot = await prisma.bot.create({
      data: {
        uid: body.uid,
        name: body.name,
        domain: "medical", 
        precallUrl: body.precallUrl,
        functionUrl: body.functionUrl,
        postcallUrl: body.postcallUrl,
      },
    });

    return NextResponse.json(bot);
  } catch (err) {
    console.error("Error creating bot:", err);
    return NextResponse.json({ error: "Failed to create bot" }, { status: 500 });
  }
}

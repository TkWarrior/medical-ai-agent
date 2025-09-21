import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function POST(NextRequest) {
  try {
    const body = await req.json();
    const preCallData = {
      patientId: "P-12345",
      name: "Asha Patel",
      dob: "1982-04-15",
      allergies: ["penicillin"],
      lastVisit: "2024-08-12",
      notes: "Hypertension — follow-up due",
    };

  
    await prisma.callLog.create({
      data: {
        callId: body.callId || `call-${Date.now()}`,
        botId: body.botId, 
        preCallData,
        status: "initiated",
      },
    });

    return NextResponse.json(preCallData);
  } catch (err) {
    console.error("Pre-call webhook error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

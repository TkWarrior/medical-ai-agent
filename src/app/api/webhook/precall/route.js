import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

   const patient = await prisma.patient.findFirst({
     where: { patientId: "P-12345" }, 
   });

   const preCallData = patient
     ? {
         patientId: patient.patientId,
         name: patient.name,
         dob: patient.dob,
         allergies: patient.allergies,
         lastVisit: patient.lastVisit,
         notes: patient.notes,
       }
     : { message: "No patient found" };
  
    await prisma.callLog.create({
      data: {
        callId: body.callId || `call-${Date.now()}`,
        botId: body.call.bot_id, 
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

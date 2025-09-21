
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(NextRequest) {
  try {
    const body = await req.json();
    const { callId, medicalId } = body;

    console.log("body :", body)
    const patient = {
      medicalId,
      name: "Asha Patel",
      dob: "1982-04-15",
      allergies: ["penicillin"],
      lastVisit: "2024-08-12",
      conditions: ["Hypertension"],
    };


    await prisma.callLog.update({
      where: { callId },
      data: {
        functionCalls: {
          push: {
            name: "fetchPatient",
            request: { medicalId },
            response: patient,
            timestamp: new Date().toISOString(),
          },
        },
      },
    });

    return NextResponse.json(patient);
  } catch (err) {
    console.error("Function-call error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

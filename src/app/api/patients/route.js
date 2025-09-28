import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req){

    try {
         const body = await req.json();

         const { patientId, name, dob, allergies, notes, lastVisit } = body;

         const patient = await prisma.patient.create({
           data: {
             patientId,
             name,
             dob: new Date(dob),
             allergies,
             notes,
             lastVisit: lastVisit ? new Date(lastVisit) : null,
           },
         });
         console.log("patient : ", patient)
         return NextResponse.json({ success: true, patient });
    } catch (error) {
        console.error(error);
        return NextResponse.json({error:"patient creation failed"} ,{status:500})
    }
   
}
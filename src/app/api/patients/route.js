import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req){

    try {
         const body = await req.json();

         const { patientID, name, dob, allergies, notes, lastVisit } = body;

         const patient = prisma.patient.create({
           data: {
             patientID,
             name,
             dob: new Date(dob),
             allergies,
             notes,
             lastVisit: lastVisit ? new Date(lastVisit) : null,
           },
         });

         return NextResponse.json({ success: true, patient });
    } catch (error) {
        console.error(error);
        return NextResponse.json({error:"patient creation failed"} ,{status:500})
    }
   
}
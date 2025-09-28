import { NextResponse } from "next/server"

export async function GET(req , {params}) {
    try {
        const patient = await prisma.patient.findUnique({
            where : { patientId : params.id},
            include : { calls : true}
        })
        if(!patient){
            return NextResponse.json({error : "patient not found"} , {status : 500})
        }
        return NextResponse.json(patient)
    } catch (error) {
        console.error("failed " , error);
        return NextResponse.json({error : "failed to fetch the patient"} , {status:500})
    }
    
}
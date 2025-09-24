import { NextResponse } from "next/server"

export async function GET(req , {params}) {
    try {
        const patient = await prisma.patient.findUnique({
            where : { pateintId : params.id},
            include : { calls : true}
        })
        if(!patient){
            return NextResponse.json({error : 500} , {status : 500})
        }
        return NextResponse.json(patient)
    } catch (error) {
        console.error("failed " , err);
        return NextResponse.json({error : "failed to fetch the patient"} , {status:500})
    }
    
}
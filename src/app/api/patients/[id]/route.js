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

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { name, dob, allergies, notes, lastVisit } = body;

    const updatedPatient = await prisma.patient.update({
      where: { patientId: params.id },
      data: {
        name,
        dob: dob ? new Date(dob) : null,
        allergies,
        notes,
        lastVisit: lastVisit ? new Date(lastVisit) : null,
      },
    });

    return NextResponse.json({ success: true, patient: updatedPatient });
  } catch (err) {
    console.error("Error updating patient:", err);
    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await prisma.patient.delete({
      where: { patientId: params.id },
    });

    return NextResponse.json({ success: true, message: "Patient deleted" });
  } catch (err) {
    console.error("Error deleting patient:", err);
    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    );
  }
}
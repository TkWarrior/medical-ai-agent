
import { prisma } from "@/app/lib/prisma";

import PatientManager from "../../../components/PatientManager";

export default async function PatientsPage() {
  
  const patients = await prisma.patient.findMany();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      
      <PatientManager initialPatients={patients}/>
      
    </div>
  );
}

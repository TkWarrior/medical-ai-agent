"use client";
import { useState } from "react";
import AddPatientModal from "./AddPatientModal";

export default function PatientManager({ initialPatients }) {
  const [patients, setPatients] = useState(initialPatients || []);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Add Patient
      </button>

      {open && (
        <AddPatientModal
          onClose={() => setOpen(false)}
          onPatientAdded={(newPatient) =>
            setPatients([...patients, newPatient])
          }
        />
      )}
      <table className="mt-6 w-full border">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="p-2 text-center">Patient ID</th>
            <th className="p-2 text-center">Name</th>
            <th className="p-2 text-center">DOB</th>
            <th className="p-2 text-center">Last Visit</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.patientId} className="border-t">
              <td className="p-2 text-center">{p.patientId}</td>
              <td className="p-2 text-center">{p.name}</td>
              <td className="p-2 text-center">
                {p.dob ? new Date(p.dob).toLocaleDateString() : "N/A"}
              </td>
              <td className="p-2 text-center">
                {p.lastVisit
                  ? new Date(p.lastVisit).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="p-2 text-center space-x-2">
                <button
                  onClick={() => {
                    setEditingPatient(p);
                    setOpen(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.patientId)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

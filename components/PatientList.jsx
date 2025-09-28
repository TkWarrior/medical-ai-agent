"use client";
import { useState } from "react";
import PatientForm from "./PatientForm";

export default function PatientList({ initialPatients }) {
  const [patients, setPatients] = useState(initialPatients || []);
  const [open, setOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const handlePatientAdded = (newPatient) => {
    setPatients([...patients, newPatient]);
  };
  
  const handlePatientUpdated = (updatedPatient) => {
    setPatients(
      patients.map((p) =>
        p.patientId === updatedPatient.patientId ? updatedPatient : p
      )
    );
  };

  const handleDelete = async (patientId) => {
    if (!confirm("Are you sure you want to delete this patient?")) return;

    try {
      const res = await fetch(`/api/patients/${patientId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPatients(patients.filter((p) => p.patientId !== patientId));
      } else {
        alert("Failed to delete patient");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting patient");
    }
  };

  return (
    <div>
      <button
        onClick={() => {
            setEditingPatient(null);
            setOpen(true)}}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Add Patient
      </button>

      {open && (
        <PatientForm
          onClose={() => setOpen(false)}
          onPatientAdded={handlePatientAdded}
          onPatientUpdated = {handlePatientUpdated}
          patient = {editingPatient}
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

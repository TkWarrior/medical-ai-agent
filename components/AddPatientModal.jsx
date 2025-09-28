"use client";
import { useState } from "react";

export default function AddPatientModal({ onClose, onPatientAdded }) {
  const [form, setForm] = useState({
    patientId: "",
    name: "",
    dob: "",
    allergies: "",
    notes: "",
    lastVisit: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: form.patientId,
          name: form.name,
          dob: form.dob ? new Date(form.dob).toISOString() : null,
          allergies: form.allergies ? form.allergies.split(",") : [],
          notes: form.notes,
          lastVisit: form.lastVisit
            ? new Date(form.lastVisit).toISOString()
            : null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        onPatientAdded(data.patient); // update parent state
        onClose(); // close modal
      } else {
        alert(data.error || "Failed to create patient");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4 text-black">
          Add New Patient
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="patientId"
            placeholder="Patient ID (e.g. P-1001)"
            value={form.patientId}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
            required
          />

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
          />

          <input
            type="text"
            name="allergies"
            placeholder="Allergies (comma separated)"
            value={form.allergies}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
          />

          <input
            type="date"
            name="lastVisit"
            value={form.lastVisit}
            onChange={handleChange}
            className="w-full border p-2 rounded text-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Patient"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import CallDetailsModal from "./CallDetailsModal.jsx";

export default function CallsList({ initialCalls }) {
  const [calls, setCalls] = useState(initialCalls || []);
  const [selectedCall, setSelectedCall] = useState(null);

  return (
    <div>
      <table className="mt-6 w-full border">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="p-2 text-center">Call ID</th>
            <th className="p-2 text-center">Patient</th>
            <th className="p-2 text-center">Bot</th>
            <th className="p-2 text-center">Status</th>
            <th className="p-2 text-center">Incoming At</th>
            <th className="p-2 text-center">Ended At</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((c) => (
            <tr key={c.callId} className="border-t">
              <td className="p-2 text-center">{c.callId}</td>
              <td className="p-2 text-center">
                {c.preCallData?.name || "Unknown"}
              </td>
              <td className="p-2 text-center">{c.bot?.name || "N/A"}</td>
              <td
                className={`p-2 text-center ${
                  c.status === "completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {c.status}
              </td>
              <td className="p-2 text-center">
                {c.incomingAt ? new Date(c.incomingAt).toLocaleString() : "N/A"}
              </td>
              <td className="p-2 text-center">
                {c.endedAt ? new Date(c.endedAt).toLocaleString() : "N/A"}
              </td>
              <td className="p-2 text-center">
                <button
                  onClick={() => setSelectedCall(c)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Call Details */}
      {selectedCall && (
        <CallDetailsModal
          call={selectedCall}
          onClose={() => setSelectedCall(null)}
        />
      )}
    </div>
  );
}

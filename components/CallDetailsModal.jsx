"use client";

export default function CallDetailsModal({ call, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative text-black">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Call Details — {call.callId}
        </h2>

        {/* Patient Info */}
        <div className="mb-4">
          <h3 className="font-bold">Patient Info</h3>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(call.preCallData, null, 2)}
          </pre>
        </div>

        {/* Transcript */}
        <div className="mb-4">
          <h3 className="font-bold">Transcript</h3>
          <pre className="bg-gray-100 p-2 rounded overflow-y-auto max-h-40">
            {call.transcript || "No transcript available"}
          </pre>
        </div>

        {/* Postcall Data */}
        <div className="mb-4">
          <h3 className="font-bold">Postcall Summary</h3>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(call.postCallData, null, 2)}
          </pre>
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}


import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Medical Voice Agent
        </h1>
        <p className="text-lg text-gray-600">
          AI-powered patient interaction 
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        <Link href="/bots">
          <div className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition cursor-pointer">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              Manage Bots
            </h2>
            <p className="text-gray-600">
              Create, update, and view OpenMic bots with their UIDs.
            </p>
          </div>
        </Link>

        <Link href="/calls">
          <div className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition cursor-pointer">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">
              View Calls
            </h2>
            <p className="text-gray-600">
              Explore call history, transcripts, and function call logs.
            </p>
          </div>
        </Link>
      </section>

      {/* Stats (example static, you can fetch from API later) */}
      <section className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Quick Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-3xl font-bold text-blue-600">3</p>
            <p className="text-gray-600">Bots</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-3xl font-bold text-green-600">12</p>
            <p className="text-gray-600">Calls</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-3xl font-bold text-purple-600">2025-09-19</p>
            <p className="text-gray-600">Last Call</p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="max-w-4xl mx-auto mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Features Implemented
        </h3>
        <ul className="bg-white rounded-xl shadow p-6 list-disc list-inside text-gray-700">
          <li>✅ Pre-call webhook configured</li>
          <li>✅ Function-call endpoint implemented</li>
          <li>✅ Post-call webhook handling</li>
          <li>✅ Bot CRUD and listing with UIDs</li>
          <li>✅ Call history with transcripts & logs</li>
        </ul>
      </section>
    </main>
  );
}

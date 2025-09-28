import CallsList from "../../../components/CallList";


export default async function CallsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/calls`, {
    cache: "no-store", // always get fresh data
  });
  const calls = await res.json();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📞 Calls Dashboard</h1>
      <CallsList initialCall = {calls}/>
    </div>
  );
}

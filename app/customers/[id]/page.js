// app/customers/[id]/page.jsx
async function getCustomer(id) {
  const base = process.env.NEXT_PUBLIC_API_URL || "";
  const res = await fetch(`${base}/api/customers/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function CustomerDetail({ params }) {
  const c = await getCustomer(params.id);
  if (!c) return <main className="p-6">Not found</main>;
  return (
    <main className="p-6 max-w-2xl mx-auto space-y-2">
      <h1 className="text-2xl font-semibold">{c.name}</h1>
      <p><b>Member Number:</b> {c.memberNumber}</p>
      <p><b>Date of Birth:</b> {new Date(c.dateOfBirth).toLocaleDateString()}</p>
      <p><b>Interests:</b> {c.interests}</p>
    </main>
  );
}

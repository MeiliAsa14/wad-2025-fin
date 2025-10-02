// app/customers/[id]/edit/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCustomer({ params }) {
  const router = useRouter();
  const [form, setForm] = useState({ name:"", dateOfBirth:"", memberNumber:"", interests:"" });
  let base = process.env.NEXT_PUBLIC_API_URL || "";
  if (base.endsWith("/")) base = base.slice(0, -1);

  useEffect(() => {
    (async () => {
  const res = await fetch(`${base}/customers/${params.id}`);
      const c = await res.json();
      setForm({
        name: c.name,
        dateOfBirth: new Date(c.dateOfBirth).toISOString().substring(0,10),
        memberNumber: c.memberNumber,
        interests: c.interests,
      });
    })();
  }, [params.id, base]);

  async function onSave(e) {
    e.preventDefault();
  let url = `${base}/customers/${params.id}`;
  // If base is relative (starts with /), make it absolute for server-side fetches
  if (typeof window === 'undefined' && url.startsWith('/')) {
    url = `http://localhost:3007${url}`;
  } else if (url.startsWith('//')) {
    url = url.replace('//', '/');
  }
  await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        memberNumber: Number(form.memberNumber),
        dateOfBirth: new Date(form.dateOfBirth)
      }),
    });
    router.push(`/customers/${params.id}`);
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Customer</h1>
      <form onSubmit={onSave} className="grid gap-3">
        <input className="border p-2 rounded" value={form.name}
          onChange={e=>setForm({...form, name:e.target.value})}/>
        <input type="date" className="border p-2 rounded" value={form.dateOfBirth}
          onChange={e=>setForm({...form, dateOfBirth:e.target.value})}/>
        <input type="number" min="1" className="border p-2 rounded" value={form.memberNumber}
          onChange={e=>setForm({...form, memberNumber:e.target.value})}/>
        <input className="border p-2 rounded" value={form.interests}
          onChange={e=>setForm({...form, interests:e.target.value})}/>
        <button className="border rounded px-3 py-2">Save</button>
      </form>
    </main>
  );
}

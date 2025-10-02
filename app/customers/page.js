// app/customers/page.jsx
"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

export default function CustomersPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name: "", dateOfBirth: "", memberNumber: "", interests: "" });
  const base = process.env.NEXT_PUBLIC_API_URL || "";

  const load = useCallback(async () => {
  const res = await fetch(`${base}/customers`, { cache: "no-store" });
    const data = await res.json();
    setRows(data);
  }, [base]);

  useEffect(() => { load(); }, [load]);

  async function onCreate(e) {
    e.preventDefault();
  await fetch(`${base}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        dateOfBirth: new Date(form.dateOfBirth),
        memberNumber: Number(form.memberNumber),
        interests: form.interests,
      }),
    });
    setForm({ name: "", dateOfBirth: "", memberNumber: "", interests: "" });
    load();
  }

  async function onDelete(id) {
  await fetch(`${base}/customers/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Customers</h1>

      {/* 3.1 List */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Member #</th>
            <th className="p-2">DOB</th>
            <th className="p-2">Interests</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c._id} className="border-t">
              <td className="p-2"><Link href={`/customers/${c._id}`} className="underline">{c.name}</Link></td>
              <td className="p-2 text-center">{c.memberNumber}</td>
              <td className="p-2 text-center">{new Date(c.dateOfBirth).toLocaleDateString()}</td>
              <td className="p-2">{c.interests}</td>
              <td className="p-2 space-x-2 text-center">
                <Link href={`/customers/${c._id}/edit`} className="px-2 py-1 border rounded">Edit</Link>
                <button onClick={() => onDelete(c._id)} className="px-2 py-1 border rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 3.3 Create */}
      <section className="border rounded p-4">
        <h2 className="font-medium mb-2">Add New Customer</h2>
        <form onSubmit={onCreate} className="grid grid-cols-2 gap-3">
          <input required placeholder="Name" className="border p-2 rounded col-span-2 sm:col-span-1"
            value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <input required type="date" className="border p-2 rounded col-span-2 sm:col-span-1"
            value={form.dateOfBirth} onChange={e=>setForm({...form, dateOfBirth:e.target.value})}/>
          <input required type="number" min="1" placeholder="Member Number" className="border p-2 rounded"
            value={form.memberNumber} onChange={e=>setForm({...form, memberNumber:e.target.value})}/>
          <input required placeholder="Interests (e.g., movies, football)" className="border p-2 rounded"
            value={form.interests} onChange={e=>setForm({...form, interests:e.target.value})}/>
          <button className="border rounded px-3 py-2 col-span-2 sm:col-span-1">Create</button>
        </form>
      </section>
    </main>
  );
}

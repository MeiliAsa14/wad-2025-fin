// app/api/customers/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";


export async function GET() {
  await dbConnect();
  const customers = await Customer.find().sort({ createdAt: -1 });
  return NextResponse.json(customers);
}


export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const created = await Customer.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

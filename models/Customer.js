// models/Customer.js
import mongoose, { Schema } from "mongoose";

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    memberNumber: { type: Number, required: true, unique: true, min: 1 },
    interests: { type: String, required: true, trim: true } // e.g., "movies, football"
  },
  { timestamps: true }
);

// Reuse model if it already exists (Next.js hot-reload)
export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

import { NextResponse } from "next/server";
import mongoose from "mongoose";

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (mongoose.connection.readyState === 0) {
  console.log(
    "Mongoose connection",
    MONGODB_URI,
    process.env.MONGODB_URI,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  await mongoose.connect(MONGODB_URI);
}
// Define Survey Schema
const surveySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  first_question: String,
  second_question: {
    looks: Number,
    price: Number,
    comfort: Number,
  },
});
const Survey = mongoose.model("Survey", surveySchema);

// API handler for saving survey completion
export async function POST(request) {
  const { email, first_question, second_question } = await request.json();

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }
    const existingSurvey = await Survey.findOne({ email });
    if (existingSurvey) {
      return NextResponse.json(
        { message: "Survey already completed for this email." },
        { status: 400 }
      );
    }

    const newSurvey = new Survey({ email, first_question, second_question });
    await newSurvey.save();
    return NextResponse.json(
      { message: "Survey completed and saved successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving survey:", error);
    return NextResponse.json(
      { message: "Failed to save survey." },
      { status: 500 }
    );
  }
}

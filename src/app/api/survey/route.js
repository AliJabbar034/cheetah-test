import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Survey from "@/app/models/Survey";

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (mongoose.connection.readyState === 0) {
  await mongoose.connect(MONGODB_URI);
}
// Define Survey Schema

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

// API handler for saving survey completion
export async function GET(request) {
  const url = new URL(request.url);

  const email = decodeURIComponent(url.searchParams.get("email"));

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }
    const existingSurvey = await Survey.findOne({ email });
    if (!existingSurvey) {
      return NextResponse.json(
        { message: "Survey No Found  for this email." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Survey  alread exist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving survey:", error);
    return NextResponse.json(
      { message: "Failed to save survey." },
      { status: 400 }
    );
  }
}

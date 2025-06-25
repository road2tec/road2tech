import dbConfig from "@/config/db.config";
import Submission from "@/model/Submission";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { form } = await req.json();
  try {
    const newSubmission = new Submission({
      ...form,
    });
    await newSubmission.save();
    return NextResponse.json(
      { message: "Details submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in submission:", error);
    return NextResponse.json(
      { error: "Failed to submit details. Please try again." },
      { status: 500 }
    );
  }
}

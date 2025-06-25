import dbConfig from "@/config/db.config";
import Submission from "@/model/Submission";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  try {
    const submissions = await Submission.find()
      .sort({ createdAt: -1 })
      .select("-__v");
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

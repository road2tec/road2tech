import Submission from "@/model/Submission";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const submissionId = searchParams.get("id");
    if (!submissionId) {
      return NextResponse.json(
        { error: "Submission ID is required" },
        { status: 400 }
      );
    }
    const deletedSubmission = await Submission.findByIdAndDelete(submissionId);
    if (!deletedSubmission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Submission deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting submission:", error);
    return NextResponse.json(
      { error: "Failed to delete submission" },
      { status: 500 }
    );
  }
}

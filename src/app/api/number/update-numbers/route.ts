import Data from "@/model/Data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { technicalNumber, nonTechnicalNumber, medicalMobileNumber } =
    await req.json();
  console.log(technicalNumber, nonTechnicalNumber, medicalMobileNumber);
  try {
    const updatedData = await Data.findOneAndUpdate(
      {},
      {
        technicalNumber,
        nonTechnicalNumber,
        medicalMobileNumber,
      },
      { new: true, upsert: true }
    );
    if (!updatedData) {
      return NextResponse.json(
        { message: "No data found to update" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    console.error("Error updating numbers:", error);
    return NextResponse.json(
      { message: "Failed to update numbers" },
      { status: 500 }
    );
  }
}

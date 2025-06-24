import dbConfig from "@/config/db.config";
import Data from "@/model/Data";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  try {
    // remove _id and __v from the response
    const data = await Data.findOne({}, { _id: 0, __v: 0 }).exec();
    if (!data) {
      return NextResponse.json(
        { message: "No numbers found" },
        { status: 404 }
      );
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching numbers:", error);
    return NextResponse.json(
      { message: "Failed to fetch numbers" },
      { status: 500 }
    );
  }
}

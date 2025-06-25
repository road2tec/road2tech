import dbConfig from "@/config/db.config";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    // find user by email
    if (email === "" || password === "") {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    } else {
      if (email === "admin@road2tech.in" && password === "Admin@1234") {
        const data = {
          _id: "admin",
          name: "Admin",
          email: "admin@road2tech.in",
        };
        const token = jwt.sign(data, process.env.JWT_SECRET!, {
          expiresIn: "1d",
        });
        const response = NextResponse.json({
          message: "Login Successfull",
          route: `/admin`,
          token,
        });
        response.cookies.set("token", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 1000,
        });
        return response;
      } else {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Received score data:", data);
    // Here you can process the score data, e.g., save it to a database
    return NextResponse.json({
      message: "Score received successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error processing score data:", error);
    return NextResponse.json({
      message: "Error processing score data",
      status: 500,
    });
  }
}

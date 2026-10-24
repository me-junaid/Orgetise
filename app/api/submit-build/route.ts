import { NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbykh5qY1c8QPlgjbF1-VRKcwqHAan1vEEbKsypZil6_mmUukOuxFVgWp56RfYOdDCyg/exec";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { personName, companyName, companyWebsite, contactMail, contactNumber, problem } = body;

    const params = new URLSearchParams({
      gid: "0",
      Name: personName || "",
      "Company Name": companyName || "",
      "Phone Number": contactNumber || "",
      Email: contactMail || "",
      Website: companyWebsite || "",
      Problem: problem || "",
    });

    const response = await fetch(`${SCRIPT_URL}?${params.toString()}`, {
      method: "POST",
    });

    let data = {};
    try {
      data = await response.json();
    } catch {
      data = { success: true };
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Submit build error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit" },
      { status: 500 }
    );
  }
}

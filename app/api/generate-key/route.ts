import { NextResponse } from "next/server";

const FASIRI_BASE = process.env.FASIRI_BASE_URL ?? "https://api.fasiri-ai.com";
const FASIRI_ADMIN_KEY = process.env.FASIRI_ADMIN_KEY ?? "";

export async function POST() {
  if (!FASIRI_ADMIN_KEY) {
    return NextResponse.json(
      { error: "Service temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  try {
    // Generate a unique name for this key
    const name = `web-${Date.now().toString(36)}`;

    const res = await fetch(`${FASIRI_BASE}/api/v1/auth/keys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FASIRI_ADMIN_KEY}`,
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.detail?.message ?? "Failed to generate key." },
        { status: res.status }
      );
    }

    return NextResponse.json({ api_key: data.api_key });
  } catch {
    return NextResponse.json(
      { error: "Network error. Please try again." },
      { status: 503 }
    );
  }
}

// src/app/api/startChat/route.ts
import type { NextRequest } from "next/server";
import { startChat } from "@/app/backend/startChat";
import { exportPages } from "next/dist/export/worker";

export async function POST(req: NextRequest) {
  const { userInput } = await req.json();

  if (!userInput) {
    return new Response(JSON.stringify({ message: "Invalid input" }), {
      status: 400,
    });
  }

  try {
    const response = await startChat([userInput]);
    return new Response(JSON.stringify({ response }), { status: 200 });
  } catch (error) {
    console.error("Error starting chat:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
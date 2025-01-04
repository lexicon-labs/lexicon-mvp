import type { NextRequest } from "next/server";
import { startChat } from "./startChat";

// Add origin validation
const validateOrigin = (request: NextRequest) => {
  const origin = request.headers.get("origin");
  // Only allow requests from our own domain
  const allowedOrigins = ["https://lexicon-landing.pages.dev", "https://lexicon.chat"];
  return allowedOrigins.includes(origin || "");
};

export async function POST(req: NextRequest) {
  // Check if request is from our own frontend
  if (!validateOrigin(req)) {
    return new Response(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
    });
  }

  const { userInput, messageHistory, config } = await req.json();

  if (!userInput) {
    return new Response(JSON.stringify({ message: "Invalid input" }), {
      status: 400,
    });
  }

  try {
    const response = await startChat(
      messageHistory || [{ role: "user", content: userInput }],
      config
    );
    return new Response(JSON.stringify({ response }), { status: 200 });
  } catch (error) {
    console.error("Error starting chat:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

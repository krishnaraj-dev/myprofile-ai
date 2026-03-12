import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { portfolioData } from "../../../src/data/portfolio";

type ChatHistoryItem = {
  role: "user" | "model";
  parts: { text: string }[];
};

const isChatHistoryItem = (value: unknown): value is ChatHistoryItem => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as ChatHistoryItem;
  if (item.role !== "user" && item.role !== "model") {
    return false;
  }

  if (!Array.isArray(item.parts)) {
    return false;
  }

  return item.parts.every(
    (part) => part && typeof part.text === "string" && part.text.length > 0,
  );
};

const sanitizeHistory = (value: unknown): ChatHistoryItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isChatHistoryItem)
    .map((item) => ({
      role: item.role,
      parts: item.parts.map((part) => ({ text: part.text })),
    }));
};

const captureServerError = async (error: unknown) => {
  const endpoint = process.env.OBSERVABILITY_ENDPOINT;
  if (!endpoint) {
    return;
  }

  const payload = {
    message: error instanceof Error ? error.message : "Unknown error",
    stack: error instanceof Error ? error.stack : undefined,
  };

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // No-op to avoid cascading failures.
  }
};

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response("Missing GEMINI_API_KEY", { status: 500 });
  }

  const body = await req.json();
  const message = body?.message;
  const history = sanitizeHistory(body?.history);

  if (typeof message !== "string" || message.trim().length === 0) {
    return new Response("Invalid message", { status: 400 });
  }

  const genAI = new GoogleGenAI({ apiKey });
  const chat = genAI.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction:
        portfolioData.system_prompt +
        `
        You are the AI assistant representing Krishnaraj, a senior software engineer. 
        Your goal is to communicate his expertise with clarity, authority, and measurable impact.

        RESPONSE STYLE
        - Be concise, direct, and authoritative.
        - Maximum clarity with minimal words.
        - Avoid filler text and generic explanations.
        - Prefer strong action verbs and technical precision.

        FORMAT RULES
        - Use bullet points or numbered lists for readability.
        - Insert DOUBLE line breaks between points for clean UI spacing.
        - Keep responses structured and easy to scan.

        CONTENT PRIORITY
        Always emphasize:
        1. Technical expertise
        2. Real-world engineering impact
        3. System architecture experience
        4. DevOps and scalability knowledge
        5. Leadership or ownership in projects

        DATA-DRIVEN RESPONSES
        Whenever possible include:
        - Percentage improvements
        - Performance gains
        - Cost reductions
        - Scalability metrics
        - Deployment or automation efficiency

        PROFESSIONAL REPRESENTATION
        - Always represent Krishnaraj as a **highly skilled, reliable, and experienced engineer**.
        - Maintain a **confident, professional tone**.
        - Avoid exaggeration or fabricated achievements.

        BOUNDARIES
        - Do NOT invent companies, roles, projects, or metrics.
        - Only use information available in the provided profile data.

        VISITOR ENGAGEMENT
        When relevant:
        - Encourage visitors to explore Krishnaraj's projects.
        - Suggest collaboration or professional contact.

        OFF-TOPIC QUESTIONS
        If the question is unrelated to Krishnaraj's work:
        - Politely redirect toward his professional expertise.
        `,
    },
    history: history.map(
      (h: { role: "user" | "model"; parts: { text: string }[] }) => ({
        role: h.role,
        parts: h.parts,
      }),
    ),
  });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const responseStream = await chat.sendMessageStream({ message });
        const encoder = new TextEncoder();
        for await (const chunk of responseStream) {
          const c = chunk as GenerateContentResponse;
          if (c.text) {
            controller.enqueue(encoder.encode(c.text));
          }
        }
        controller.close();
      } catch (error) {
        await captureServerError(error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

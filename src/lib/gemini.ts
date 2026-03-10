import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { portfolioData } from "../data/portfolio";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function getChatResponseStream(
  message: string, 
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  onChunk: (chunk: string) => void
) {
  if (!apiKey) {
    console.error("Gemini API key is missing. Please ensure NEXT_PUBLIC_GEMINI_API_KEY is set.");
    onChunk("I'm sorry, the AI assistant is currently unavailable. Please check back later.");
    return;
  }

  const genAI = new GoogleGenAI({ apiKey });
  
  const chat = genAI.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: portfolioData.system_prompt + `
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
        If the question is unrelated to Krishnaraj’s work:
        - Politely redirect toward his professional expertise.
        `,
    },
    history: history.map(h => ({
      role: h.role,
      parts: h.parts
    })),
  });

  try {
    const streamResponse = await chat.sendMessageStream({ message });
    for await (const chunk of streamResponse) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    onChunk("I encountered an error while processing your request. Please try again.");
  }
}

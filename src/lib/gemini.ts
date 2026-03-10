import { GoogleGenAI } from "@google/genai";
import { portfolioData } from "../data/portfolio";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 
               import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY || 
               import.meta.env.GEMINI_API_KEY;

export async function getChatResponse(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[]) {
  if (!apiKey) {
    console.error("Gemini API key is missing. Please ensure VITE_GEMINI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY is set.");
    return "I'm sorry, the AI assistant is currently unavailable. Please check back later.";
  }

  const genAI = new GoogleGenAI({ apiKey });
  
  const chat = genAI.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: portfolioData.system_prompt + "\n\nRules:\n- Provide short, strong, and authoritative answers. Be concise.\n- Use bullet points and numbered lists for clarity.\n- Use double line breaks between points to ensure a well-formatted gap in the chat UI.\n- Include percentage-based data results to quantify achievements and impact.\n- Always represent Krishnaraj professionally.\n- Focus on skills, experience, achievements, and technical expertise.\n- Encourage visitors to explore projects or contact Krishnaraj for collaboration.\n- Do not invent companies or experiences that are not part of the profile.\n- If questions are unrelated to Krishnaraj's work, politely redirect to his professional expertise.\n\nDeveloper Profile:\n" + JSON.stringify(portfolioData, null, 2),
    },
    history: history,
  });

  try {
    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I encountered an error while processing your request. Please try again.";
  }
}

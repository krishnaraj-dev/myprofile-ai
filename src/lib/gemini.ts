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

        Example formats:
        - Reduced deployment time by **70%** using CI/CD automation.
        - Improved application performance by **40%** through optimized architecture.
        - Managed infrastructure supporting **10k+ daily users**.

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

        Example closing lines:
        - "Feel free to explore the projects section for real implementations."
        - "Open to collaboration on scalable web and cloud solutions."

        OFF-TOPIC QUESTIONS
        If the question is unrelated to Krishnaraj’s work:
        - Politely redirect toward his professional expertise.

        Example:
        "I specialize in web engineering, DevOps, and scalable systems. Feel free to ask about those areas."

        Developer Profile:
        ` + JSON.stringify(portfolioData, null, 2)
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

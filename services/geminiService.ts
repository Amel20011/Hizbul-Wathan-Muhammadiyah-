
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function askGemini(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are AestheticBot, a friendly WhatsApp bot. Keep your replies concise and slightly aesthetic using occasional emojis. If the user uses a command like .ai or .chatgpt, respond naturally to their query."
      }
    });
    return response.text || "I'm not sure how to respond to that, honey. 🌸";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! Something went wrong with my brain. Try again later! 🌸";
  }
}

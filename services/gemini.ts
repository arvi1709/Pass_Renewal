
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PassData } from "../types";

export const generatePersonalizedMessage = async (data: Partial<PassData>): Promise<string> => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY || "");
  
  const category = data.category === 'Custom' ? data.customCategory : data.category;
  const prompt = `
    Write a short, heartfelt, and creative 1-2 sentence message for an "Official 2026 Bond Renewal Pass".
    Sender: ${data.senderName}
    Receiver: ${data.receiverName}
    Bond Type: ${category}
    Mood: ${data.mood}
    Duration: ${data.duration}
    Context: Happy New Year 2026!
    ${data.customMessage ? `User Note: ${data.customMessage}` : ''}
    
    Make it sound modern, aesthetic, and appropriate for the mood selected. Use 1 or 2 emojis.
    Example for Funny Mood: "Renewing our chaos subscription for 2026. Still hasn't expired, unfortunately for society! 🤡🥂"
    Example for Romantic Mood: "Entering 2026 with my favorite heart. Renewal complete for infinity. 💖🥂"
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-preview"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text.trim() || "Bond renewed for 2026! Cheers to many more memories. ✨";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Official 2026 Bond Renewal: Access granted to all my time, snacks, and secrets. 💌";
  }
};

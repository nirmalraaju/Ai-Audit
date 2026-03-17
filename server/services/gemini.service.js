import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "../prompts/systemPrompt.js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeCode = async (userCode) => {
  // Use Gemini 1.5 Flash - it's fast and perfect for code analysis
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: systemPrompt 
  });

  const result = await model.generateContent(userCode);
  const response = await result.response;
  const text = response.text();
  
  // Clean up the response in case the AI wraps it in ```json tags
  const cleanJson = text.replace(/```json|```/g, "");
  return JSON.parse(cleanJson);
};
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const getA11yFix = async (violation: any) => {
  // Use gemini-1.5-flash for speed or gemini-2.5-flash as found previously
  // I'll use gemini-1.5-flash as the user reverted to it in their manual change
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const node = violation.nodes[0];
  const brokenHtml = node.html;
  const summary = violation.help;

  const prompt = `
    Context: A web accessibility audit found an issue: "${summary}"
    Target HTML: ${brokenHtml}
    
    Task: Fix this HTML snippet to pass WCAG 2.1 AA standards.
    - If it's a contrast issue, suggest a compliant hex color in a style tag.
    - If it's a missing label, add aria-label or a <label> tag.
    - If it's an image, add an alt attribute.
    
    Return ONLY the fixed HTML snippet code. No explanations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().replace(/```html|```/g, "").trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate fix.";
  }
};

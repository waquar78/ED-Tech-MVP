
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateLesson = async (req, res) => {
  try {
    const { transcriptText } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
    Create a lesson page from the given transcript. Include:
    1. Overview (short summary)
    2. Time-stamped highlights
    3. Key terms (with short definitions)
    4. 5 MCQs
    5. 1 exam-style question
    Transcript:
    ${transcriptText}
    `;

    const result = await model.generateContent(prompt);
    const lesson = result.response.text();

    res.json({ lesson });
  } catch (err) {
    res.status(500).json({ error: "Lesson generation failed" });
  }
};

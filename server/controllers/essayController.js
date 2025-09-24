
import { GoogleGenerativeAI } from "@google/generative-ai";
import Essay from "../models/essay.js";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const scoreEssay = async (req, res) => {
  try {
    const { question, markingScheme, answer, userId } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
    You are an examiner. Score the essay strictly out of 25.
    Question: ${question}
    Marking Scheme: ${markingScheme}
    Student Answer: ${answer}

    Provide:
    1. Final numeric score out of 25
    2. 2-3 lines feedback
    `;

    const result = await model.generateContent(prompt);
    const feedback = result.response.text();

    // Store in DB
    const essay = await Essay.create({
      question,
      markingScheme,
      answer,
      score: parseInt(feedback.match(/\d+/)?.[0] || 0, 10),
      feedback,
      userId,
    });

    res.json(essay);
  } catch (err) {
    res.status(500).json({ error: "Essay scoring failed" });
  }
};

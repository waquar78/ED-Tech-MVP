import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChromaClient } from "chromadb";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chroma = new ChromaClient({
  host: "localhost",  
  port: 8000,         
  ssl: false          
});


// Semantic search + answer generation
export const ragSearch = async (req, res) => {
  try {
    const { query } = req.body;

    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const emb = await model.embedContent(query);
    const queryEmbedding = emb.embedding.values;

    const collection = await chroma.getOrCreateCollection({ name: "rag-contents" });
    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: 3,
    });

    const context = results.documents.flat().join("\n");

    const chatModel = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Answer this question based on the context below:
      Question: ${query}
      Context: ${context}`;

    const answer = await chatModel.generateContent(prompt);

    res.json({ answer: answer.response.text(), sources: results });
  } catch (err) {
    console.error("RAG Search Error:", err);
    res.status(500).json({ error: "RAG search failed" });
  }
};

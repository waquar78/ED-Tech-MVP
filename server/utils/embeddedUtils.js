
import { ChromaClient } from "chromadb";
import Content from "../models/content.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Chroma client setup
const chromaClient = new ChromaClient({
  host: "localhost", 
  port: 8000,      
  ssl: false         
});

// Gemini AI client setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate embedding function
export async function generateEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" }); // updated model
  const result = await model.embedContent(text);
  return result.embedding.values; // array of numbers
}

// Embed and store chunks
export async function embedAndStore(chunks) {
  const collection = await chromaClient.getOrCreateCollection({ name: "content_embeddings" });

  for (const chunk of chunks) {
    //  Generate embedding
    const embeddingVector = await generateEmbedding(chunk.text);

    //  Unique ID for Chroma + Mongo
    const uniqueId = chunk.metadata.source + "-" + Date.now();

    //  Store in Chroma
    await collection.add({
      ids: [uniqueId],
      embeddings: [embeddingVector],
      documents: [chunk.text],
      metadata: [chunk.metadata] // note singular 'metadata'
    });

    //  Store in MongoDB
    const contentDoc = new Content({
      text: chunk.text,

      metadata: chunk.metadata,
      embeddingId: uniqueId
    });

    await contentDoc.save();
  }

  console.log(" All chunks embedded and saved successfully!");
}

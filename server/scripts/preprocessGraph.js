// backend/scripts/preprocessGraph.js
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Content from "../models/content.js";
import connectDB from "../config/db.js";

dotenv.config();

async function run() {
  try {
    //  Database connect
    await connectDB();

    console.log(" Building knowledge graph from MongoDB...");

    
    const contents = await Content.find();

    //  Graph structure banao
    const graph = {};

    for (const c of contents) {
      const { subject, topic, subtopic } = c.metadata;

      if (!graph[subject]) graph[subject] = {};
      if (!graph[subject][topic]) graph[subject][topic] = {};
      if (!graph[subject][topic][subtopic]) graph[subject][topic][subtopic] = [];

      graph[subject][topic][subtopic].push(c._id.toString());
    }

    //  JSON file me save karo
    const outPath = path.resolve("output/lessons/knowledgeGraph.json");
    fs.writeFileSync(outPath, JSON.stringify(graph, null, 2));

    console.log(" Knowledge Graph saved at:", outPath);
  } catch (err) {
    console.error(" Knowledge graph build failed:", err);
  } finally {
    process.exit();
  }
}

run();

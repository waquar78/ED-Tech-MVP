// server/scripts/processPDF.js
import dotenv from "dotenv";
import path from "path";
import { parsePDF } from "../utils/pdfParser.js";
import { embedAndStore } from "../utils/embeddedUtils.js";
import connectDB from "../config/db.js";

dotenv.config();

async function run() {
  try {
   
    await connectDB();

    //  PDF path
    const filePath = path.resolve("test/data/05-versions-space.pdf");
   

    //  Parse PDF into chunks
    const chunks = await parsePDF(filePath, "React", "Easy");
    console.log(`Parsed ${chunks.length} chunks from PDF`);

    //  Embed + Store in ChromaDB + MongoDB
    await embedAndStore(chunks);

    console.log("PDF processing complete!");
  } catch (err) {
    console.error(" PDF processing failed:", err);
  } finally {
    process.exit();
  }
}

run();




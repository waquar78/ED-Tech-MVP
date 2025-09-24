import fs from "fs";
import pdf from "pdf-parse";

export async function parsePDF(filePath, subject = "React", difficulty = "Easy") {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdf(dataBuffer);

  const text = pdfData.text.replace(/\n+/g, " ").trim(); // clean text

  // Chunking logic: 300 words per chunk
  const words = text.split(" ");
  const chunkSize = 300;
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    const chunkWords = words.slice(i, i + chunkSize);
    chunks.push({
      text: chunkWords.join(" "),
      metadata: {
        subject,
        topic: "General", // later topic-wise split
        subtopic: "General",
        difficulty,
        source: filePath.split("/").pop(), // PDF file name
        page: null, 
      },
    });
  }

  return chunks;
}

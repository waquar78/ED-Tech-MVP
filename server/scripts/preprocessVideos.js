
// preprocessVideos.js
import dotenv from "dotenv";
import { fetchVideoTranscript } from "../utils/videoTranscript.js";
import { embedAndStore } from "../utils/embeddedUtils.js"; // typo fix
import connectDB from "../config/db.js";

dotenv.config();

async function run() {
  try {
    // Database connect
    await connectDB();

    const videoId = "w7ejDZ8SWv8"; // yt video id

    // Transcript + chunks
    const chunks = await fetchVideoTranscript(videoId, "React", "Medium");

    console.log(`Parsed ${chunks.length} chunks from video`);

    // Embed + Store
    await embedAndStore(chunks);

    console.log("Video processing complete!");
  } catch (err) {
    console.error("Video processing failed:", err);
  } finally {
    process.exit();
  }
}

run();

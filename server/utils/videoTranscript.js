
// videoTranscript.js
import { YoutubeTranscript } from "youtube-transcript";
export async function fetchVideoTranscript(
  videoId = "w7ejDZ8SWv8", // YT ID
  subject = "React",
  difficulty = "Easy"
) {
  try {
    // fetch transcript using youtube-transcript-api
  const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    // Debug log - check if transcript is empty or not
    console.log("RAW Transcript length:", transcript.length);
    console.log("RAW Transcript sample:", transcript.slice(0, 5)); // first 5 lines

    const chunkSize = 300; // approx words
    const chunks = [];

    let buffer = [];
    for (const t of transcript) {
      const words = t.text.split(" ");
      buffer.push(...words);

      if (buffer.length >= chunkSize) {
        const chunkWords = buffer.splice(0, chunkSize);
        chunks.push({
          text: chunkWords.join(" "),
          metadata: {
            subject,
            topic: "Video",
            subtopic: "General",
            difficulty,
            source: videoId,
            timestamp: t.start, // youtube-transcript-api uses start time
          },
        });
      }
    }

    // Remaining words
    if (buffer.length > 0) {
      chunks.push({
        text: buffer.join(" "),
        metadata: {
          subject,
          topic: "Video",
          subtopic: "General",
          difficulty,
          source: videoId,
          timestamp: transcript[transcript.length - 1]?.start ?? 0,
        },
      });
    }

    console.log("Transcript chunks:", chunks);

    return chunks;
  } catch (err) {
    console.error("Transcript fetch failed:", err);
    return [];
  }
}

// run for testing
//fetchVideoTranscript()
;


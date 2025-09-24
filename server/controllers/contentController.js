import Content from "../models/content.js";

//  Get all content
export const getAllContent = async (req, res) => {
  try {
    const contents = await Content.find().limit(20); // just sample
    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
};

// Get content by subject
export const getContentBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const contents = await Content.find({ "metadata.subject": subject });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch by subject" });
  }
};

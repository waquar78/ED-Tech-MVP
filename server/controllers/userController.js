// backend/controllers/userController.js
import User from "../models/user.js";
import Content from "../models/content.js";
import dotenv from "dotenv";

dotenv.config();


// Function to update a user's mastery score
export const updateMastery = async (req, res) => {
  try {
    const { userId, contentId, isCorrect } = req.body; // true ya false

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const masteryEntry = user.mastery.find(
      (m) => m.contentId.toString() === contentId
    );

    let newScore = 0;
    if (masteryEntry) {
      // Agar pehle se mastery entry hai
      const currentScore = masteryEntry.score || 0;
      const currentAttempts = masteryEntry.attempts || 0;
      newScore = isCorrect
        ? Math.min(10, currentScore + 1) // Max score 10
        : Math.max(0, currentScore - 1); // Min score 0

      masteryEntry.score = newScore;
      masteryEntry.attempts = currentAttempts + 1;
    } else {
      // Nai entry banayenge
      newScore = isCorrect ? 1 : 0;
      user.mastery.push({ contentId, score: newScore, attempts: 1 });
    }

    await user.save();
    res.json({ message: "Mastery updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Failed to update mastery" });
  }
};

// Function to recommend next items
export const recommendNext = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("mastery.contentId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Example logic: Recommend 3 items the user has low mastery in or hasn't attempted
    const lowMasteryItems = user.mastery
      .filter((item) => item.score < 5)
      .map((item) => item.contentId._id);

    // Agar low mastery items hain, toh unmein se kuch recommend karo
    if (lowMasteryItems.length > 0) {
      const recommendations = lowMasteryItems.slice(0, 3);
      user.recommendedNext = recommendations.map((id) => ({ contentId: id }));
      await user.save();
      return res.json({ recommendations });
    }

    // Agar sab mein mastery high hai, toh naya content recommend karo
    const allContent = await Content.find()
      .limit(10)
      .sort({ createdAt: -1 });
    const newRecommendations = allContent
      .slice(0, 3)
      .map((content) => ({ contentId: content._id }));

    user.recommendedNext = newRecommendations;
    await user.save();

    res.json({ recommendations: newRecommendations });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};
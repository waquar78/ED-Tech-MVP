import express from "express";
import { recommendNext, updateMastery } from "../controllers/userController.js";

const router = express.Router();

router.post("/update-mastery", updateMastery);
router.get("/recommendations/:userId", recommendNext);

export default router;
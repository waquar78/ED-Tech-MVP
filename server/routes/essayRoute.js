
import express from "express";
import { scoreEssay } from "../controllers/essayController.js";

const router = express.Router();

router.post("/score", scoreEssay);

export default router;

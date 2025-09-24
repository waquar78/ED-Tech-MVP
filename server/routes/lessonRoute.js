
import express from "express";
import { generateLesson } from "../controllers/lessonController.js";

const router = express.Router();

router.post("/", generateLesson);

export default router;


import express from "express";
import { getAllContent, getContentBySubject } from "../controllers/contentController.js";

const router = express.Router();

router.get("/", getAllContent);
router.get("/:subject", getContentBySubject);

export default router;

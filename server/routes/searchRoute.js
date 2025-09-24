
import express from "express";
import { ragSearch } from "../controllers/searchController.js";

const router = express.Router();

router.post("/", ragSearch);

export default router;

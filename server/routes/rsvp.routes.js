import express from "express";
import { rsvpEvent, leaveEvent } from "../controllers/rsvp.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:id", protect, rsvpEvent);
router.delete("/:id", protect, leaveEvent);

export default router;

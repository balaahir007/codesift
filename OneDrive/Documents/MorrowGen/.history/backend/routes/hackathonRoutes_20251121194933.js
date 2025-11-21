import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import authorize from "../middleware/authorize.js";
import {
  getAllHackathons,
  deleteHackathon,
  createHackathon,
  updateHackathon,
  getHackathon,
  registerForHackathon,
  getMyRegistrations,
  getHackathonTeamRules,
  getHackathonRegistrationRules
} from "../controllers/hackathonController.js";

const router = express.Router();

// Public static routes FIRST
router.get("/", getAllHackathons);
router.get("/teamRules/:id", getHackathonTeamRules);
router.get("/registrationRules/:id", getHackathonRegistrationRules);

// Dynamic route AFTER static ones
router.get("/:id", getHackathon);

// Protected routes
router.post("/", protectRoute, authorize(["teacher", "admin"]), createHackathon);
router.put("/:id", protectRoute, authorize(["organizer", "admin"]), updateHackathon);
router.delete("/:id", protectRoute, authorize(["organizer", "admin"]), deleteHackathon);

// Registration routes
router.get("/my-registrations", protectRoute, getMyRegistrations);
router.post("/:id/register", protectRoute, registerForHackathon);

export default router;

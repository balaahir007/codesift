import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import authorize from "../middleware/authorize.js";
import { getAllHackathons,deleteHackathon,createHackathon,updateHackathon,getHackathon, registerForHackathon, getMyRegistrations, getHackathonTeamRules, getHackathonRegistrationRules } from "../controllers/hackathonController.js";
const router = express.Router();


router.get('/', getAllHackathons);
router.get('/:id', getHackathon);
router.get('/teamRules/:id', getHackathonTeamRules);
router.get('/registrationRules/:id', getHackathonRegistrationRules);

// Protected routes (require authentication)
router.post('/', protectRoute, authorize(['teacher', 'admin']), createHackathon);
router.put('/hackathons/:id', protectRoute, authorize(['organizer', 'admin']), updateHackathon);
router.delete('/hackathons/:id', protectRoute, authorize(['organizer', 'admin']), deleteHackathon);

// Registration routes
router.get('/my-registrations', protectRoute, getMyRegistrations);
router.post('/:id/register', protectRoute, registerForHackathon);

export default router;
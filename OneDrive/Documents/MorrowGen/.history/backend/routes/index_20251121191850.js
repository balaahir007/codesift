import express from "express";
console.log("Loading studySpaceRoutes");
import studySpaceRoutes from "./studySpace/index.js";

console.log("Loading authRoutes");
import authRoutes from "../routes/userRoutes.js";

console.log("Loading interviewRoutes");
import interviewRoutes from "../routes/interviewRoutes.js";

console.log("Loading planRoutes");
import planRoutes from "../routes/plansRoutes.js";

console.log("Loading sessionRoutes");
import sessionRoutes from "../routes/sessionRoutes.js";

console.log("Loading learnhubRoutes");
import learnhubRoutes from "./learnhubRoutes.js";

console.log("Loading courseRoutes");
import courseRoutes from "./courseRoutes.js";

console.log("Loading companyRoutes");
import companyRoutes from "./companyRoutes.js";

console.log("Loading jobRoutes");
import jobRoutes from "./jobRoutes.js";

console.log("Loading applicationRoutes");
import applicationRoutes from "./applicationRoutes.js";

console.log("Loading collegeRoutes");
import collegeRoutes from "./collegeRoutes.js";

console.log("Loading hackathonRoutes");
import hackathonRoutes from "./hackathonRoutes.js";

console.log("Loading savedItemRoutes");
import savedItemRoutes from "./savedItemRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/study-space", studySpaceRoutes);
router.use("/interview", interviewRoutes);
router.use("/plans", planRoutes);
router.use("/session", sessionRoutes);
router.use("/learnhub", learnhubRoutes);
router.use("/course", courseRoutes);
router.use("/company", companyRoutes);
router.use("/jobs", jobRoutes);
router.use("/application", applicationRoutes);
router.use("/hackathons", hackathonRoutes);
router.use("/college", collegeRoutes);
router.use("/saved-items", savedItemRoutes);


export default router;

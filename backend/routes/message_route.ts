import { Router } from "express";
import { protectRoute } from "../middlewares/protect_route_middleware";
import { getMessages, getUnSeenMessagesCounts, sendMessage } from "../controllers/message_controller";

const router = Router();

router.get("/get/unseen-counts", protectRoute, getUnSeenMessagesCounts);
router.get("/get/:otherUserId", protectRoute, getMessages);
router.post("/send/:receiverId", protectRoute, sendMessage);

export default router;
import { Router } from "express";
import { protectRoute } from "../middlewares/protect_route_middleware";
import { getMessages, sendMessage } from "../controllers/message_controller";

const router = Router();

router.get("/get/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
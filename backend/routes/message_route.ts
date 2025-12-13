import { Router } from "express";
import { getAllUsers } from "../controllers/message_controller";
import { protectRoute } from "../middlewares/protect_route_middleware";

const router = Router();

router.use(protectRoute);

router.get("/users", getAllUsers);

export default router;
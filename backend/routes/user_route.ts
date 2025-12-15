import { Router } from "express";
import { getAllUsers } from "../controllers/user_controller";
import { protectRoute } from "../middlewares/protect_route_middleware";

const router = Router();

router.use(protectRoute);

router.get("/", getAllUsers);

export default router;
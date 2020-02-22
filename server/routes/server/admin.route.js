import Router from "express";
import authController from "../../controllers/server/auth.controller";

const router = Router();

router.get("/", authController.getDashboard);

export default router;

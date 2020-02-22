import Router from "express";
import authController from "../controllers/auth.controller";

const router = Router();

router.get("/", authController.getDashboard);

export default router;

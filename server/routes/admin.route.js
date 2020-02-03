import Router from "express";
import authController from "../controllers/auth.controller";
import isAuth from "../middlewares/isAuth";
const router = Router();

router.get("/", isAuth, authController.getDashboard);

export default router;

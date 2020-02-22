import Router from "express";
import authController from "../../controllers/server/auth.controller";

const router = Router();

router.get("/login", authController.getLoginPage);
router.get("/login", authController.getLoginPage);
router.post("/login", authController.login);

export default router;

import Router from "express";
import authController from "../../controllers/server/auth.controller";

const router = Router();

router.get("/login", authController.getLoginPage);
router.get("/login", authController.getLoginPage);
router.post("/login", authController.login);
router.get("/final-step/:token", authController.getAdminCreationValidationPage);
router.post("/final-step/:token", authController.validateAdminCreation);

export default router;

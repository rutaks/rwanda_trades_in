import Router from "express";
import authController from "../../controllers/server/auth.controller";

const router = Router();

router.get("/login", authController.getLoginPage);
router.get("/login", authController.getLoginPage);
router.post("/login", authController.login);
router.get("/forgot-password", authController.getForgotPasswordPage);
router.post("/forgot-password", authController.sendForgotPasswordRequest);
router.get("/reset-password/:token", authController.getResetPasswordPage);
router.post("/reset-password/:token", authController.resetPassword);
router.get("/final-step/:token", authController.getAdminCreationValidationPage);
router.post("/final-step/:token", authController.validateAdminCreation);

export default router;

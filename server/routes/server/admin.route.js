import Router from "express";
import authController from "../../controllers/server/auth.controller";

const router = Router();

router.get("/", authController.getDashboard);
router.get("/users/new", authController.getCreateUserPage);
router.post("/users/new", authController.createUserPage);

export default router;

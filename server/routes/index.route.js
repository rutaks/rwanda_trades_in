import Router from "express";
import authRoute from "./auth.route";
import adminRoute from "./admin.route";

const router = Router();

router.use("/admin", adminRoute);
router.use("/auth", authRoute);

export default router;

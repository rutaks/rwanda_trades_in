import Router from "express";
import authRoute from "./server/auth.route";
import adminRoute from "./server/index.route";
import apiRoute from "./api/index.route";
import clientRoute from "./client/index.route";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.use("/", clientRoute);
router.use("/auth", authRoute);
router.use("/admin", isAuth, adminRoute);
router.use("/api", apiRoute);

export default router;

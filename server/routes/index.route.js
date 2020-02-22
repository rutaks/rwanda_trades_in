import Router from "express";
import authRoute from "./auth.route";
import adminRoute from "./admin.route";
import categoryRoute from "./category.route";
import productRoute from "./product.route";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.use("/auth", authRoute);
router.use("/admin", isAuth, adminRoute);
router.use("/admin/categories", isAuth, categoryRoute);
router.use("/admin/products", isAuth, productRoute);

export default router;

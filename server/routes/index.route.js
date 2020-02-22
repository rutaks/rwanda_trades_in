import Router from "express";
import authRoute from "./server/auth.route";
import adminRoute from "./server/admin.route";
import categoryRoute from "./server/category.route";
import productRoute from "./server/product.route";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.use("/auth", authRoute);
router.use("/admin", isAuth, adminRoute);
router.use("/admin/categories", isAuth, categoryRoute);
router.use("/admin/products", isAuth, productRoute);

export default router;

import Router from "express";
import adminRoute from "./admin.route";
import categoryRoute from "./category.route";
import productRoute from "./product.route";

const router = Router();

router.use("/", adminRoute);
router.use("/categories", categoryRoute);
router.use("/products", productRoute);

export default router;

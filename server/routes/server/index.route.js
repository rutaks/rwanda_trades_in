import Router from "express";
import adminRoute from "./admin.route";
import categoryRoute from "./category.route";
import productRoute from "./product.route";
import productRequestRoute from "./productRequest.route";

const router = Router();

router.use("/", adminRoute);
router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/product-requests", productRequestRoute);

export default router;

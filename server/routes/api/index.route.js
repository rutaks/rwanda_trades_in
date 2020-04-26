import Router from "express";
import productRequestRoute from "./server/productRequest.route";

const router = Router();

router.use("/product-requests", productRequestRoute);

export default router;

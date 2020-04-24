import Router from "express";
import indexController from "../../controllers/client/index.controller";
import categoryRoute from "./category.route";
import productRoute from "./product.route";
import productRequestRoute from "./productRequest.route";

const router = Router();

router.get("/", indexController.getHomePage);
router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/product-requests", productRequestRoute);

export default router;

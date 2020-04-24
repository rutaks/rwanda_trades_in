import Router from "express";
import productController from "../../controllers/client/product.controller";

const router = Router();

router.get("/", productController.getProduct);

export default router;

import Router from "express";
import productController from "../../controllers/client/product.controller";

const router = Router();

router.get("/:productId", productController.getProduct);
router.post("/search", productController.searchProduct);

export default router;

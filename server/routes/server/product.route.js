import Router from "express";
import upload from "../../middlewares/upload-product-images";
import productController from "../../controllers/server/product.controller";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/new", productController.getAddProductPage);
router.post("/new", upload, productController.addProduct);
// router.get("/modify/:categoryId", categoryController.getModifyCategoryPage);
// router.post("/modify/:categoryId", categoryController.modifyCategory);
// router.get("/remove/:categoryId", categoryController.removeCategory);

export default router;
